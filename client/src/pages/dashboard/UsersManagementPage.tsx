import React, { useState, useEffect } from 'react';
import { Search, UserCog, ShieldCheck, Trash2, Power } from 'lucide-react';
import api from '../../services/api';
import { User, UserRole } from '../../types';
import { Header } from '../../components/dashboard/Header';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { TableRowSkeleton } from '../../components/common/LoadingSkeleton';

export const UsersManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users?limit=50');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error('Failed fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await api.patch(`/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId || (u as any)._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed updating user role.');
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      const res = await api.patch(`/users/${userId}/status`);
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId || (u as any)._id === userId
              ? { ...u, isActive: res.data.data.isActive }
              : u
          )
        );
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed toggling user status.');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user account?')) return;
    try {
      await api.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId && (u as any)._id !== userId));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed deleting user.');
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <Header
        title="User Accounts & Role Governance"
        subtitle="Manage access permissions, assign organizer roles, and monitor user statuses."
      />

      <div className="px-8 space-y-6">
        <div className="bg-brand-surface p-4 rounded-2xl border border-brand-border flex items-center justify-between shadow-subtle">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by user name or email..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <span className="text-xs text-brand-mutedGray font-semibold">
            {filtered.length} Registered Accounts
          </span>
        </div>

        <div className="bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-subtle">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border bg-brand-background/60 text-brand-mutedGray uppercase tracking-wider font-semibold">
                <th className="p-4">User</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Organization</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-darkSlate">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={5} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-brand-mutedGray italic">
                    No users found matching search.
                  </td>
                </tr>
              ) : (
                filtered.map((usr) => {
                  const uid = usr.id || (usr as any)._id;

                  return (
                    <tr key={uid} className="hover:bg-brand-hoverBg/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                            {usr.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-brand-primary">{usr.name}</p>
                            <p className="text-[11px] text-brand-mutedGray">{usr.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={usr.role}
                          onChange={(e) => handleRoleChange(uid, e.target.value as UserRole)}
                          className="px-2.5 py-1 rounded-lg border border-brand-border text-xs font-semibold bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        >
                          <option value="super_admin">Super Admin</option>
                          <option value="admin">Platform Admin</option>
                          <option value="organizer">Event Organizer</option>
                          <option value="attendee">Attendee</option>
                        </select>
                      </td>
                      <td className="p-4 text-brand-mutedGray">
                        {usr.organization || 'Individual'}
                      </td>
                      <td className="p-4">
                        <Badge variant={usr.isActive !== false ? 'success' : 'danger'} size="sm">
                          {usr.isActive !== false ? 'ACTIVE' : 'DEACTIVATED'}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleStatus(uid)}
                            className="p-1.5 text-brand-mutedGray hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                            title={usr.isActive !== false ? 'Deactivate Account' : 'Activate Account'}
                          >
                            <Power className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(uid)}
                            className="p-1.5 text-brand-mutedGray hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
