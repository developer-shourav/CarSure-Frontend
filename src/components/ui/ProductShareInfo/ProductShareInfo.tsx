import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { Truck, Package, ShieldCheck } from "lucide-react";

interface ProductShareInfoProps {
  url: string;
  title: string;
}

export default function ProductShareInfo({
  url,
  title,
}: ProductShareInfoProps) {
  return (
    <div className="mt-5 space-y-4">
      {/* Shipping, Delivery, Money Back */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <Truck className="w-5 h-5 text-gray-500" />
          <span>Free Shipping & Returns on this item</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <Package className="w-5 h-5 text-gray-500" />
          <span>Delivery within 3-5 working days</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <ShieldCheck className="w-5 h-5 text-gray-500" />
          <span>Money Back Guarantee</span>
        </div>
      </div>

      {/* Share Buttons */}
      <div>
        <div className="text-sm font-medium mb-2 text-gray-700">
          Share this product:
        </div>
        <div className="flex gap-2">
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <RedditShareButton url={url} title={title}>
            <RedditIcon size={32} round />
          </RedditShareButton>

          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>
      </div>
    </div>
  );
}
