"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { MoreVertical, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureRequest {
  id: string;
  name: string;
  email: string;
  featureRequest: string;
  userType: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<FeatureRequest | null>(null);
  const [search, setSearch] = useState("");
  const [filter] = useState("all");

  useEffect(() => {
    const fetchFeatureRequests = async () => {
      try {
        const response = await fetch("/api/feature-request");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setFeatureRequests(data);
      }catch (err: unknown) { // replace 'any' with 'unknown'
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFeatureRequests();
  }, []);

  const filteredRequests = featureRequests.filter((req) => {
    const matchesSearch =
      req.name.toLowerCase().includes(search.toLowerCase()) ||
      req.email.toLowerCase().includes(search.toLowerCase()) ||
      req.featureRequest.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || req.userType === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <p className="text-center py-10 text-neutral-400">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-neutral-950 min-h-screen text-white">
      <Card className="shadow-2xl border border-neutral-800 bg-neutral-900">
        <CardHeader className="border-b border-neutral-800 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Feature Requests
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search by name, email or request..."
                  className="pl-9 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredRequests.length === 0 ? (
            <div className="py-20 text-center text-neutral-400 text-lg">
              No matching requests found.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-b-lg">
              <Table className="w-full border border-neutral-800 rounded-xl overflow-hidden">
                <TableHeader className="sticky top-0 bg-neutral-900/90 backdrop-blur-md z-10">
                  <TableRow>
                    {["ID", "Name", "Email", "Request", "User Type", "Submitted At", "Actions"].map((head) => (
                      <TableHead
                        key={head}
                        className="py-3 px-4 text-sm font-semibold text-neutral-300 uppercase tracking-wide"
                      >
                        {head}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredRequests.map((request, idx) => (
                    <TableRow
                      key={request.id}
                      className={`transition-colors ${
                        idx % 2 === 0 ? "bg-neutral-950 hover:bg-neutral-900/70" : "bg-neutral-900 hover:bg-neutral-800/70"
                      }`}
                    >
                      <TableCell className="py-3 px-4 text-neutral-400  font-mono text-xs">
                        {request.id.slice(0, 8)}
                      </TableCell>
                      <TableCell className="py-5 px-4 text-white font-medium">{request.name}</TableCell>
                      <TableCell className="py-3 px-4 text-neutral-300 truncate max-w-[200px]">{request.email}</TableCell>
                      <TableCell className="py-3 px-4 text-neutral-300 max-w-[240px] truncate">{request.featureRequest}</TableCell>
                      <TableCell className="py-3 px-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          request.userType === "job-seeker" ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" : "bg-green-500/10 text-green-400 border border-green-500/30"
                        }`}>
                          {request.userType}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 px-4 text-neutral-400 whitespace-nowrap">
                        {new Date(request.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl">
                            <DropdownMenuItem
                              onClick={() => setSelectedRequest(request)}
                              className="flex items-center gap-2  rounded-md px-3 py-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Sheet */}
      <Sheet open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <SheetContent className="bg-neutral-950 text-white border-l border-neutral-800 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">Feature Request Details</SheetTitle>
            <SheetDescription className="text-neutral-400">Full details of the selected request.</SheetDescription>
          </SheetHeader>

          {selectedRequest && (
            <div className="grid p-6 gap-4">
              {[
                ["ID", selectedRequest.id],
                ["Name", selectedRequest.name],
                ["Email", selectedRequest.email],
                ["Request", selectedRequest.featureRequest],
                ["User Type", selectedRequest.userType],
                ["Submitted At", new Date(selectedRequest.createdAt).toLocaleString()],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col border border-neutral-700 rounded-md p-3 gap-1">
                  <span className="text-sm font-medium text-neutral-400">{label}</span>
                  <span className="text-sm text-neutral-200 break-words">{value}</span>
                </div>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
