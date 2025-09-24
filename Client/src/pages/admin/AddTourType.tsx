import DeleteConfirmation from "@/components/DeleteConfirmation";
import AddTourTypeModel from "@/components/modules/admin/tourType/AddTourTypeModel";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

const AddTourType = () => {
  const { data } = useGetTourTypesQuery(undefined);
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
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModel></AddTourTypeModel>
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
            {data?.map((item: { _id: string; name: string }) => (
              <TableRow>
                <TableCell className="w-full">{item?.name}</TableCell>
                <TableCell>
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button size="sm" className="rounded-[2px] cursor-pointer">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;
