import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Enquiry } from "@shared/types";
import { format } from "date-fns";
import { ExternalLink, X } from "lucide-react";

interface EnquiryModalProps {
  enquiry: Enquiry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  reviewed: "bg-purple-100 text-purple-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
};

export default function EnquiryModal({ enquiry, open, onOpenChange }: EnquiryModalProps) {
  if (!enquiry) return null;

  const parseLinks = (linksString: string | null): Array<{ label: string; url: string }> => {
    if (!linksString) return [];
    try {
      return JSON.parse(linksString);
    } catch {
      // Try parsing as plain text URLs
      const urls = linksString.match(/https?:\/\/[^\s]+/g) || [];
      return urls.map((url) => ({
        label: new URL(url).hostname,
        url,
      }));
    }
  };

  const links = parseLinks(enquiry.relevantLinks);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{enquiry.projectName}</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Enquiry from {enquiry.clientName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status and Date */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Status</p>
              <Badge className={`${statusColors[enquiry.status] || "bg-gray-100 text-gray-800"}`}>
                {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">Submitted</p>
              <p className="font-medium">{format(new Date(enquiry.createdAt), "MMM dd, yyyy")}</p>
            </div>
          </div>

          {/* Client Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-border py-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Client Name</p>
              <p className="font-medium">{enquiry.clientName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Phone Number</p>
              <a
                href={`tel:${enquiry.phoneNumber}`}
                className="font-medium text-primary hover:underline"
              >
                {enquiry.phoneNumber}
              </a>
            </div>
          </div>

          {/* Budget */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Budget</p>
            <p className="text-lg font-semibold text-foreground">{enquiry.budget}</p>
          </div>

          {/* Project Description */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Project Description</p>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {enquiry.projectDescription}
            </p>
          </div>

          {/* Relevant Links */}
          {links.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">Relevant Links</p>
              <div className="space-y-2">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors group"
                  >
                    <span className="text-sm font-medium text-primary group-hover:underline flex-1 truncate">
                      {link.label}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Raw Links Display */}
          {enquiry.relevantLinks && links.length === 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Relevant Links</p>
              <p className="text-foreground whitespace-pre-wrap text-sm bg-muted p-3 rounded-lg">
                {enquiry.relevantLinks}
              </p>
            </div>
          )}

          {/* Timestamps */}
          <div className="text-xs text-muted-foreground border-t border-border pt-4">
            <p>Created: {format(new Date(enquiry.createdAt), "PPpp")}</p>
            <p>Updated: {format(new Date(enquiry.updatedAt), "PPpp")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
