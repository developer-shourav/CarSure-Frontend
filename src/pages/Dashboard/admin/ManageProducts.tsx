import { useState } from "react";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productManagement.api";
import { TCar, TMeta } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { successTheme } from "@/styles/toastThemes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import UpdateProductModal from "@/components/ui/modal/UpdateProductModal";

export default function ManageProducts() {
  const [page, setPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<TCar | null>(null);

  const {
    data: carResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllProductsQuery(
    [
      { name: "limit", value: "10" },
      { name: "page", value: String(page) },
    ],
    {
      pollingInterval: 300000,
      refetchOnReconnect: true,
    }
  );

  const cars = carResponse?.data as TCar[];
  const meta = carResponse?.meta as TMeta;

  const [deleteCar, { isLoading: deleteLoading }] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteCar(id).unwrap();
      toast.success("Product deleted successfully", successTheme);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  const handleUpdate = (car: TCar) => {
    setSelectedCar(car);
    setEditModalOpen(true);
  };

  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Manage Products" />

      <div className="mt-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading || isFetching
              ? [...Array(8)].map((_, index) => (
                  <TableRow key={index}>
                    {Array(9)
                      .fill(0)
                      .map((_, i) => (
                        <TableCell key={i}>
                          <Skeleton className="h-4 w-full rounded-md" />
                        </TableCell>
                      ))}
                  </TableRow>
                ))
              : cars?.map((car, idx) => (
                  <TableRow key={car._id}>
                    <TableCell>{meta.limit * (page - 1) + idx + 1}</TableCell>
                    <TableCell>
                      <img
                        src={car.productImg}
                        alt={car.carName}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell>{car.carName}</TableCell>
                    <TableCell>{car.brand}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>${car.price.toLocaleString()}</TableCell>
                    <TableCell>
                      {car.inStock ? (
                        <span className="text-green-500 font-medium">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleUpdate(car)}
                      >
                        Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            disabled={deleteLoading}
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        {
                          <UpdateProductModal
                            open={editModalOpen}
                            onClose={() => setEditModalOpen(false)}
                            carData={selectedCar}
                            refetch={refetch}
                          />
                        }
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this product?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(car._id)}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta?.totalPage > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <span className="text-sm font-medium">
            Page {page} of {meta.totalPage}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === meta.totalPage}
            onClick={() => setPage((p) => Math.min(p + 1, meta.totalPage))}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </DashboardBodyWrapper>
  );
}
