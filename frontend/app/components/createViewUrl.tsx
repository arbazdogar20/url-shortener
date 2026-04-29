"use client";

import { useState, useEffect } from 'react'
import { CopyIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ShortUrl {
  id: string;
  url: string;
  shortUrl: string;
}

const CreateViewUrl = ({ hostName }: { hostName: string | null } ) => {

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

   const [url, setUrl] = useState("");
    const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  
    const handleShorten = async () => {
      const res = await fetch(`${serverUrl}/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
  
      if (res.ok) {
        const data = await res.json();
        setShortUrls((prev) => [...prev, data]);
        toast.success("URL shortened and copied to clipboard!");
        navigator.clipboard.writeText(`${hostName}/${data.shortUrl}`);
        setUrl("");
      } else {
        res.json().then((text) => {
          toast.error(text.message || "Failed to shorten URL");
        });
      }
    };
  
    const fetechShortUrl = async () => {
      const res = await fetch(`${serverUrl}/url`);
      if (res.ok) {
        const data = await res.json();
        setShortUrls(data);
      }
    };
  
    useEffect(() => {
      fetechShortUrl();
    }, []);
  


  return (
    <>
    <div className="w-full max-w-3xl bg-white p-2 rounded-xl card-shadow flex flex-col md:flex-row gap-2 border border-outline-variant self-center mt-8">
        <div className="grow flex items-center px-4 gap-3">
          <input
            type="text"
            placeholder="Enter URL to shorten"
            className="w-full border-none focus:ring-0 font-code text-code py-4 text-on-surface placeholder:text-outline-variant outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white font-h2 text-h2 px-8 py-4 rounded-lg hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleShorten}
          >
            Shorten
          </button>
        </div>
      </div>
      <div className="w-full max-w-3xl bg-white p-4 rounded-xl card-shadow flex flex-col gap-2 border border-outline-variant self-center my-8">
        <h2 className="text-h2 font-h2 text-on-surface">Shortened URLs</h2>
        { shortUrls.length !== 0 ? shortUrls.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg border border-gray-50 bg-gray-100 flex items-center justify-between group hover:border-primary-fixed transition-colors"
          >
            <div className="overflow-hidden">
              <p className="font-h2 text-body-md text-blue-500 mb-1 truncate">
                {`${hostName}/${item.shortUrl}`}
              </p>
              <p className="font-body-md text-xs text-on-surface-variant truncate">
                {item.url}
              </p>
            </div>
            <button
              className="text-gray-500 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`${hostName}/${item.shortUrl}`);
                toast.success("URL copied to clipboard!");
              }}
            >
              <CopyIcon size={20} />
            </button>
          </div>
        )) : (
          <p className="text-center text-on-surface-variant">No URLs shortened yet.</p>
        )}
      </div>
    </>
  )
}

export default CreateViewUrl
