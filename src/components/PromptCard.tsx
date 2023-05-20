"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  post: Record<string, any>;
  handleTagClick?: (tagName: any) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
};

const PromptCard = ({
  post,
  handleTagClick,
  handleDelete,
  handleEdit,
}: Props) => {
  const { data: session } = useSession();
  const [copied, setCopied] = React.useState("");
  const pathname = usePathname();

  const handleCopy = React.useCallback(() => {
    setCopied(post?.prompt);
    navigator.clipboard.writeText(post?.prompt);

    setTimeout(() => setCopied(""), 3000);
  }, [post?.prompt]);
  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <Link
          href={
            session?.user?.email === post?.creator?.email
              ? `/profile`
              : `/profile/${post?.creator?.id}`
          }
        >
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post?.creator?.image}
              alt="creatorimage"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post?.creator?.name}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post?.creator?.email}
              </p>
            </div>
          </div>
        </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copyimage"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>

      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        {post?.tag}
      </p>
      {session?.user?.email === post?.creator?.email &&
        pathname === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
