import DeleteConfirmation from "@/components/DeleteConfirmation";
import AddTourTypeModel from "@/components/modules/admin/tourType/AddTourTypeModel";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddTourType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetTourTypesQuery({
    page: currentPage,
    limit,
  });
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeTourType(tourId).unwrap();
      if (res.success) {
        toast.success("Removed", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove tour type", { id: toastId });
    }
  };

  const totalPage = data?.meta?.totalPage || 1;
  console.log("API Response:", data);
  console.log("API Response Total Page:", totalPage);

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModel />
      </div>

      <div className="border border-muted rounded-[2px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.data?.length > 0 ? (
              data?.data?.map((item: { _id: string; name: string }) => (
                <TableRow key={item._id}>
                  <TableCell className="w-full">{item?.name}</TableCell>
                  <TableCell className="text-right">
                    <DeleteConfirmation
                      onConfirm={() => handleRemoveTourType(item._id)}
                    >
                      <Button
                        size="sm"
                        className="rounded-[2px] cursor-pointer"
                        variant="destructive"
                      >
                        <Trash2 />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-6">
                  No tour types found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPage > 1 && (
        <div className="flex justify-end mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AddTourType;
