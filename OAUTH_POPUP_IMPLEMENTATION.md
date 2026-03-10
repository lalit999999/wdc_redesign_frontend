# OAuth Popup Implementation

## What Changed

The OAuth flow now uses a **popup window** instead of a full-page redirect, enabling a better user experience in single-page applications.

## How It Works

### 1. Login Page Opens Popup (Frontend)

When user clicks "Continue with Google":

```javascript
const popup = window.open(
  "http://localhost:5000/api/auth/google",
  "Google Login",
  "width=500,height=600,left=...,top=...",
);
```

- Opens OAuth provider (Google) in a **centered popup window**
- Main app page stays open and active
- If popup is blocked, user gets an alert

### 2. OAuth Provider Redirects to Callback

Backend's `/api/auth/google` endpoint redirects to:

```
http://localhost:3000/auth-callback?token=xxx&user=...
```

The callback page opens **in the popup window**.

### 3. Callback Posts Message to Parent (Frontend)

When AuthCallback.tsx loads in the popup:

```javascript
// In popup window
if (window.opener) {
  window.opener.postMessage(
    {
      type: "OAUTH_SUCCESS",
      token: "jwt-token",
      user: { id, name, email, role },
    },
    window.location.origin, // Security: only same origin
  );

  window.close(); // Close popup
}
```

### 4. Login Page Receives Message (Frontend)

Login page listens for messages:

```javascript
window.addEventListener("message", (event) => {
  if (event.data.type === "OAUTH_SUCCESS") {
    // Save token & user
    localStorage.setItem("token", event.data.token);
    localStorage.setItem("user", JSON.stringify(event.data.user));

    // Redirect based on role
    navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard");
  }
});
```

- Saves auth data to localStorage
- Redirects appropriately
- Popup automatically closes

## User Experience

**Before:** Full page redirect to Google → back to callback → redirect to dashboard

- Loses current page state
- Disorienting

**After:** Click button → popup opens → authenticate in popup → popup closes → stay on login with redirected dashboard

- Smoother experience
- Main page never changes until redirect
- If user closes popup, main page unchanged

## Fallback for Direct Access

If someone visits `/auth-callback` directly (not from popup):

```javascript
if (!window.opener) {
  // No parent window, use traditional redirect
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));
  navigate("/dashboard");
}
```

This ensures the callback page still works if accessed directly.

## Security Notes

### Origin Verification

```javascript
// Only listen to messages from same origin
if (event.origin !== window.location.origin) return;
```

Prevents cross-site attacks. Popup auth data only accepted from same domain.

### No Token in URL (Backend Responsibility)

Frontend receives token in URL params from backend. While not ideal:

- Token is in URL briefly (popup's URL bar)
- Popup is same-origin window
- Should only be sent via HTTPS in production
- Consider storing refresh tokens in secure HttpOnly cookies on backend

## Potential Browser Issues

### Popup Blocked

Some browsers block popups by default. User needs to:

1. Allow popups for this site
2. Or check their popup blocker settings
3. Alert notifies them: "Popup blocked! Please enable popups."

### Cookie Issues

Popups from same origin can share localStorage/cookies normally.
Tests locally to ensure backend sets appropriate CORS headers.

## Chrome/Firefox/Safari Behavior

| Browser | Behavior                | Notes                              |
| ------- | ----------------------- | ---------------------------------- |
| Chrome  | Opens popup, auth works | May require popup permission       |
| Firefox | Opens popup, auth works | Popup stays on top                 |
| Safari  | Opens popup, auth works | Verify CORS headers configured     |
| IE11    | Opens popup, auth works | window.postMessage fully supported |

## Backend Integration

No changes needed if backend already:

1. Redirects to `/auth-callback?token=...&user=...`
2. Has CORS headers: `Access-Control-Allow-Origin: http://localhost:3000`

The auth logic remains unchanged; only the window handling.

## Testing Locally

1. Click "Continue with Google"
2. Popup window should appear (centered, 500x600)
3. Google OAuth flow completes in popup
4. Popup closes automatically
5. Main page redirects to dashboard
6. Token/user saved in localStorage

If popup doesn't open:

- Check browser popup settings
- Check console for errors
- Verify backend is running on port 5000

## Alternative: Redirect Mode

If popups don't work for your use case, revert to full-page redirect:

```javascript
const handleGoogleLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/google";
};
```

This is simpler but less smooth.

## Files Modified

1. **src/app/pages/Login.tsx**
   - Changed to `window.open()` popup
   - Added `useEffect` for message listener
   - Handles token/user from popup

2. **src/app/pages/AuthCallback.tsx**
   - Detects if in popup (`window.opener`)
   - Sends auth data via `postMessage`
   - Closes popup after auth
   - Falls back to redirect if not in popup

## Summary

✅ OAuth now works in popup window
✅ Smoother, less disorienting UX
✅ Main app state preserved until redirect
✅ Same security as before (origin verification)
✅ Fallback for direct access still works
