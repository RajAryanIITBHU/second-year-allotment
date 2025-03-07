import PushBackBtn from '@/components/ui/push-back-btn'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <section className="w-full relative max-w-screen-sm mx-auto px-4 py-6 space-y-4">
      <div className="flex gap-3 items-center ">
        <PushBackBtn/>
        <h2 className="tracking-wide font-medium text-muted-foreground">
          Notifications
        </h2>
      </div>
      <Separator />
      <Image
        src={"/no-notification.svg"}
        width={150}
        height={200}
        objectFit="cover"
        alt="no-notification"
        className="grayscale opacity-40 mx-auto pt-16 pb-6"
      />
      <div className="font-semibold tracking-wide text-muted-foreground/60 mx-auto text-center text-lg">
        No Notifications
      </div>
    </section>
  );
}

export default page
