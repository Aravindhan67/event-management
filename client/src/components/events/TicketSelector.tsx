import React from 'react';
import { Check, Plus, Minus, AlertCircle } from 'lucide-react';
import { Ticket } from '../../types';

interface TicketSelectorProps {
  tickets: Ticket[];
  selectedQuantities: { [ticketId: string]: number };
  onQuantityChange: (ticketId: string, quantity: number) => void;
}

export const TicketSelector: React.FC<TicketSelectorProps> = ({
  tickets,
  selectedQuantities,
  onQuantityChange,
}) => {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="p-6 bg-brand-surface rounded-xl border border-brand-border text-center text-sm text-brand-mutedGray">
        Ticket tiers are being finalized for this event. Please check back shortly.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => {
        const qty = selectedQuantities[ticket._id] || 0;
        const isSoldOut = ticket.availableQuantity <= 0;

        return (
          <div
            key={ticket._id}
            className={`p-5 rounded-xl border transition-all ${
              qty > 0
                ? 'border-brand-primary bg-brand-hoverBg/40 shadow-sm'
                : 'border-brand-border bg-brand-surface hover:border-brand-secondary/40'
            } ${isSoldOut ? 'opacity-60 pointer-events-none' : ''}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-brand-primary font-heading">{ticket.name}</h4>
                  {ticket.price === 0 ? (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-100 text-emerald-800">
                      Free
                    </span>
                  ) : (
                    <span className="font-bold text-lg text-brand-primary">${ticket.price}</span>
                  )}
                </div>

                {ticket.description && (
                  <p className="text-xs text-brand-mutedGray leading-relaxed">{ticket.description}</p>
                )}

                <div className="text-[11px] text-brand-mutedGray">
                  {isSoldOut ? (
                    <span className="text-rose-600 font-semibold">Sold Out</span>
                  ) : (
                    <span>{ticket.availableQuantity} available (max {ticket.maxPerOrder} per booking)</span>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-brand-border rounded-lg bg-brand-surface p-1 shadow-subtle">
                  <button
                    type="button"
                    onClick={() => onQuantityChange(ticket._id, Math.max(0, qty - 1))}
                    disabled={qty === 0 || isSoldOut}
                    className="w-8 h-8 rounded flex items-center justify-center text-brand-darkSlate hover:bg-brand-hoverBg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-brand-primary">{qty}</span>
                  <button
                    type="button"
                    onClick={() =>
                      onQuantityChange(
                        ticket._id,
                        Math.min(ticket.maxPerOrder, ticket.availableQuantity, qty + 1)
                      )
                    }
                    disabled={qty >= ticket.maxPerOrder || qty >= ticket.availableQuantity || isSoldOut}
                    className="w-8 h-8 rounded flex items-center justify-center text-brand-darkSlate hover:bg-brand-hoverBg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Perks list */}
            {ticket.perks && ticket.perks.length > 0 && (
              <div className="mt-3 pt-3 border-t border-brand-border/60 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-brand-darkSlate">
                {ticket.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
