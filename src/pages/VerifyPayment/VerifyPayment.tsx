import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useVerifyOrderQuery } from "@/redux/features/order/order";
import { Link, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";


interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function VerifyPayment() {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData: OrderData = data?.data?.[0];

  return isLoading ? (
    <Skeleton />
  ) : (
    <SectionWrapper>
        <WebsiteHeading title="Order Verification" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-semibold">Order ID:</dt>
                <dd>{orderData?.order_id}</dd>
                <dt className="font-semibold">Amount:</dt>
                <dd>
                  {orderData?.currency} {orderData?.amount?.toFixed(2)}
                </dd>
                <dt className="font-semibold">Status:</dt>
                <dd>
                  <Badge
                    variant={
                      orderData?.bank_status === "Success"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {orderData?.bank_status}
                  </Badge>
                </dd>
                <dt className="font-semibold">Date:</dt>
                <dd>{new Date(orderData?.date_time)?.toLocaleString()}</dd>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-semibold">Method:</dt>
                <dd>{orderData?.method}</dd>
                <dt className="font-semibold">Transaction ID:</dt>
                <dd>{orderData?.bank_trx_id}</dd>
                <dt className="font-semibold">Invoice No:</dt>
                <dd>{orderData?.invoice_no}</dd>
                <dt className="font-semibold">SP Code:</dt>
                <dd>{orderData?.sp_code}</dd>
                <dt className="font-semibold">SP Message:</dt>
                <dd>{orderData?.sp_message}</dd>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-semibold">Name:</dt>
                <dd>{orderData?.name}</dd>
                <dt className="font-semibold">Email:</dt>
                <dd>{orderData?.email}</dd>
                <dt className="font-semibold">Phone:</dt>
                <dd>{orderData?.phone_no}</dd>
                <dt className="font-semibold">Address:</dt>
                <dd>{orderData?.address}</dd>
                <dt className="font-semibold">City:</dt>
                <dd>{orderData?.city}</dd>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {orderData?.is_verify === 1 ? (
                  <>
                    <CheckCircle className="text-green-500" />
                    <span>Verified</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="text-yellow-500" />
                    <span>Not Verified</span>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/cart">
                <Button className="w-full">View Cart</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

    </SectionWrapper>
  );
}
