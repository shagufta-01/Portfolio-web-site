import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, Eye, Search } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import EnquiryModal from "@/components/EnquiryModal";
import type { Enquiry } from "@shared/types";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  reviewed: "bg-purple-100 text-purple-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
};

export default function Enquiries() {
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Queries and mutations
  const { data: enquiries = [], isLoading, refetch } = trpc.enquiry.list.useQuery();
  const deleteEnquiry = trpc.enquiry.delete.useMutation();

  // Filter enquiries based on search term
  const filteredEnquiries = useMemo(() => {
    if (!searchTerm) return enquiries;
    const term = searchTerm.toLowerCase();
    return enquiries.filter(
      (e) =>
        e.clientName.toLowerCase().includes(term) ||
        e.projectName.toLowerCase().includes(term) ||
        e.phoneNumber.includes(term)
    );
  }, [enquiries, searchTerm]);

  const handleViewDetails = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    setDeletingId(id);
    try {
      await deleteEnquiry.mutateAsync({ id });
      toast.success("Enquiry deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete enquiry");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Enquiries</h1>
          <p className="text-lg text-muted-foreground">
            Manage all project enquiries and submissions
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, project, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => refetch()}>
            Refresh
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          {filteredEnquiries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No enquiries found</p>
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                className="mx-auto"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="font-semibold">Client Name</TableHead>
                    <TableHead className="font-semibold">Project</TableHead>
                    <TableHead className="font-semibold">Phone</TableHead>
                    <TableHead className="font-semibold">Budget</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((enquiry) => (
                    <TableRow
                      key={enquiry.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">{enquiry.clientName}</TableCell>
                      <TableCell>{enquiry.projectName}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${enquiry.phoneNumber}`}
                          className="text-primary hover:underline"
                        >
                          {enquiry.phoneNumber}
                        </a>
                      </TableCell>
                      <TableCell>{enquiry.budget}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[enquiry.status] || "bg-gray-100 text-gray-800"
                          }
                        >
                          {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(enquiry.createdAt), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(enquiry)}
                            className="text-primary hover:bg-primary/10"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(enquiry.id)}
                            disabled={deletingId === enquiry.id}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            {deletingId === enquiry.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Enquiries</p>
            <p className="text-3xl font-bold text-foreground">{enquiries.length}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">New</p>
            <p className="text-3xl font-bold text-blue-600">
              {enquiries.filter((e) => e.status === "new").length}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">In Progress</p>
            <p className="text-3xl font-bold text-yellow-600">
              {enquiries.filter((e) => e.status === "in-progress").length}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {enquiries.filter((e) => e.status === "completed").length}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EnquiryModal
        enquiry={selectedEnquiry}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
