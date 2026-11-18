import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, CheckCircle2, Clock } from 'lucide-react';
import api from '../../services/api';
import { Inquiry } from '../../types';
import { Header } from '../../components/dashboard/Header';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { TableRowSkeleton } from '../../components/common/LoadingSkeleton';

export const InquiriesManagementPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await api.get('/inquiries');
      if (res.data.success) {
        setInquiries(res.data.data);
      }
    } catch (err) {
      console.error('Failed fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/inquiries/${id}/status`, { status });
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: status as any } : inq))
      );
      if (selectedInquiry?._id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: status as any } : null));
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed updating inquiry status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this inquiry message?')) return;
    try {
      await api.delete(`/inquiries/${id}`);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      if (selectedInquiry?._id === id) setSelectedInquiry(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed deleting inquiry.');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <Header
        title="Client Inquiries & Support Messages"
        subtitle="Review prospective organizer queries, delegate questions, and partnership messages."
      />

      <div className="px-8 space-y-6">
        <div className="bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-subtle">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border bg-brand-background/60 text-brand-mutedGray uppercase tracking-wider font-semibold">
                <th className="p-4">Sender</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Message Snippet</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-darkSlate">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={6} />)
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-brand-mutedGray italic">
                    No client inquiries recorded.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-brand-hoverBg/40 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-brand-primary">{inq.name}</p>
                      <p className="text-[11px] text-brand-mutedGray">{inq.email}</p>
                      {inq.phone && <p className="text-[10px] text-brand-secondary">{inq.phone}</p>}
                    </td>
                    <td className="p-4 font-semibold text-brand-primary max-w-[180px] truncate">
                      {inq.subject}
                    </td>
                    <td className="p-4 max-w-[260px] truncate text-brand-mutedGray">
                      {inq.message}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          inq.status === 'resolved'
                            ? 'success'
                            : inq.status === 'in_progress'
                            ? 'warning'
                            : 'primary'
                        }
                        size="sm"
                      >
                        {inq.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 text-brand-mutedGray">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1.5 text-brand-mutedGray hover:text-brand-primary hover:bg-brand-hoverBg rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="p-1.5 text-brand-mutedGray hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInquiry && (
        <Modal
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          title={selectedInquiry.subject}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="p-4 bg-brand-background rounded-xl border border-brand-border space-y-1.5 text-xs">
              <p>
                <strong className="text-brand-darkSlate">From:</strong> {selectedInquiry.name} (
                {selectedInquiry.email})
              </p>
              {selectedInquiry.phone && (
                <p>
                  <strong className="text-brand-darkSlate">Phone:</strong> {selectedInquiry.phone}
                </p>
              )}
              <p>
                <strong className="text-brand-darkSlate">Received:</strong>{' '}
                {new Date(selectedInquiry.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-brand-border bg-brand-surface text-sm text-brand-darkSlate leading-relaxed whitespace-pre-wrap">
              {selectedInquiry.message}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-brand-border">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-brand-mutedGray">Update Status:</span>
                <button
                  onClick={() => handleUpdateStatus(selectedInquiry._id, 'in_progress')}
                  className="px-2.5 py-1 text-xs rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200"
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedInquiry._id, 'resolved')}
                  className="px-2.5 py-1 text-xs rounded bg-emerald-100 text-emerald-800 font-semibold hover:bg-emerald-200"
                >
                  Resolved
                </button>
              </div>

              <Button variant="outline" size="sm" onClick={() => setSelectedInquiry(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
