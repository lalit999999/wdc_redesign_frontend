import { DashboardSidebar } from '../components/DashboardSidebar';
import { Plus, X, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function AdminAssignments() {
  const { assignments, addAssignment } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('');

  const handleCreate = () => {
    if (!title || !description || !deadline || !category) return;
    addAssignment({ title, description, deadline, category, status: 'active' });
    setTitle('');
    setDescription('');
    setDeadline('');
    setCategory('');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl font-semibold text-foreground">Manage Assignments</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {showForm ? 'Cancel' : 'Create Assignment'}
            </button>
          </div>

          {/* Create Form */}
          {showForm && (
            <div className="mb-8 p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">New Assignment</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Assignment title..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe the assignment..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-foreground">Deadline</label>
                    <input
                      type="text"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      placeholder="e.g. 15th Mar 2026"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-foreground">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      <option value="">Select category</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="Database">Database</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleCreate}
                  disabled={!title || !description || !deadline || !category}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Assignment
                </button>
              </div>
            </div>
          )}

          {/* Assignments List */}
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="p-5 bg-card border border-border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                      <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {assignment.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Due: {assignment.deadline}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {assignments.length === 0 && (
            <div className="p-12 bg-card border border-border rounded-lg text-center">
              <p className="text-muted-foreground">No assignments created yet. Click "Create Assignment" to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}