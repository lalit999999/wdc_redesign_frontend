# Quick Admin Setup

## Method 1: Using Browser Console (Easiest)

1. Open your browser DevTools (F12)
2. Go to Console tab
3. Paste and run this code:

```javascript
fetch("http://localhost:5000/api/dev/make-admin", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "your-email@nitp.ac.in" }),
})
  .then((r) => r.json())
  .then((d) => console.log(d));
```

Replace `your-email@nitp.ac.in` with your actual Google login email.

## Method 2: Using cURL

Open terminal and run:

```bash
curl -X POST http://localhost:5000/api/dev/make-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@nitp.ac.in"}'
```

## Method 3: Direct MongoDB

Use MongoDB Compass or shell:

```javascript
db.users.updateOne(
  { email: "your-email@nitp.ac.in" },
  { $set: { role: "admin" } },
);
```

## Next Steps

1. Log out and log back in
2. Try creating an assignment or announcement
3. Check browser Console (F12) for error messages if it doesn't work
4. Check server logs in terminal for detailed error messages
