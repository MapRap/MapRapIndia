import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Slide = () => {
  // console.log(screen.width < 700);
  return (
    <div className=" z-50 slid overflow-hidden mt-6">
      <div className="flex slide-track w-[300vw] h-[40vh] lg:h-[60vh] gap-10">
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[39vw] md:w-[29vw] md:text-sm">
                  5 Star Hotel
                </div>
                <Image
                  src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIH0OlOQPCQMX2Ybk8lCzs7mNe9ZGDfyPpAthr"
                  alt="gg"
                  loading="lazy"
                  width={5000}
                  height={500}
                  className="m-2"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex">
                {/* <div> */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI5kmbqEHC9QHG4RoL1ixrFbqJWYmnEkcINdB3"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader className="">
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI5kmbqEHC9QHG4RoL1ixrFbqJWYmnEkcINdB3"
                        alt="gg"
                        loading="lazy"
                        width={2300}
                        height={3300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                {/* </div> */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIufjyJk0b1d0WrnIGikZpwj7vg326BqRcEP5F"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIufjyJk0b1d0WrnIGikZpwj7vg326BqRcEP5F"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIqufJEJcObDNf85SGrpvqu9K7hVkol0UR2isZ"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIqufJEJcObDNf85SGrpvqu9K7hVkol0UR2isZ"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIH0OlOQPCQMX2Ybk8lCzs7mNe9ZGDfyPpAthr"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIH0OlOQPCQMX2Ybk8lCzs7mNe9ZGDfyPpAthr"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[32vw] md:w-[22vw] md:text-sm">
                  Mr Ayush Choudhary Residence
                </div>
                <Image
                  src="https://utfs.io/f/GH57qH88dIR15WSz8yM3Rq9HnDQlUoLEwZT0a4gmIYB2jvOK"
                  loading="lazy"
                  width={7000}
                  height={600}
                  className="m-2 w-full"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent className="h-[50vh]">
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex">
                <Dialog>
                  <DialogTrigger asChild>
                    <video
                      src="../homeVid1.mp4"
                      autoPlay
                      muted
                      loop
                      className="absolute z-[-10] md:w-[20vw] h-[40vh]"
                    ></video>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <video
                        src="../homeVid1.mp4"
                        autoPlay
                        muted
                        loop
                        className=" z-[-10] md:w-[25vw] h-[70vh]"
                      ></video>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                {/* <Image
                  src="/../cartoon4.webp"
                  loading="lazy"
                  width={5000}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                /> */}
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] md:text-sm">
                  IIT Jodhpur Interior
                </div>
                <Image
                  src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIw6eCho7HXV31qyIYPUuQc4sLtnOv8bM9FlTo"
                  loading="lazy"
                  width={5000}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIR5AAV7UAvQye6328IqjpWBoKgFDiu9VRfh7b"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIR5AAV7UAvQye6328IqjpWBoKgFDiu9VRfh7b"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIosnFeet1OKGk3cCDytE7jqAFuVNU2IdWXxQv"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIosnFeet1OKGk3cCDytE7jqAFuVNU2IdWXxQv"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIC98ygIuLTSkXbe1g8UWQYzGyRrsC9d6E3iBw"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIC98ygIuLTSkXbe1g8UWQYzGyRrsC9d6E3iBw"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI0hjzRgQJZBCdzUpR5I98blMOsxua2NrfQXnP"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI0hjzRgQJZBCdzUpR5I98blMOsxua2NrfQXnP"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className=" w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI79TzqalgJ0scwFBh6vtHy7PdEISQruU5oenj"
                      alt="gg"
                      loading="lazy"
                      width={250}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI79TzqalgJ0scwFBh6vtHy7PdEISQruU5oenj"
                        alt="gg"
                        loading="lazy"
                        width={250}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI8PHKryY3NIvg4qmitproZxLuGbEV0kRz9Xfe"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI8PHKryY3NIvg4qmitproZxLuGbEV0kRz9Xfe"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIJErdjIyycuNlfwBY8rVGtnR6ZEQ3LCKDpm9o"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIJErdjIyycuNlfwBY8rVGtnR6ZEQ3LCKDpm9o"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIw6eCho7HXV31qyIYPUuQc4sLtnOv8bM9FlTo"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIw6eCho7HXV31qyIYPUuQc4sLtnOv8bM9FlTo"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] md:text-sm">
                  Mr. Rahul Sharma Residence, Gangyal, Jammu
                </div>
                <Image
                  src="/proj1.jpg"
                  loading="lazy"
                  width={5000}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="/proj1.jpg"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="/proj1.jpg"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] md:text-sm">
                  Mr. Neeraj Residence, Talab Tillo{" "}
                </div>
                <Image
                  src="/proj2.png"
                  loading="lazy"
                  width={5000}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="/proj2.png"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="/proj2.png"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className=" w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] md:text-sm">
                  Landscape Design
                </div>
                <Image
                  src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIAZ8aNIwhsCHMSfGVTUwzDgqIcW7uFb1mn2eL"
                  loading="lazy"
                  width={5000}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihICT7B9cuLTSkXbe1g8UWQYzGyRrsC9d6E3iBw"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihICT7B9cuLTSkXbe1g8UWQYzGyRrsC9d6E3iBw"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIkPe12fzUAwEeZODTuPm6GVJyB7ogSb0QMYnk"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIkPe12fzUAwEeZODTuPm6GVJyB7ogSb0QMYnk"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIMpv6ML4kKc8tAa5BrF7NeQSCwGXiPbylzJ43"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIMpv6ML4kKc8tAa5BrF7NeQSCwGXiPbylzJ43"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className=" w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIMLKVhS4kKc8tAa5BrF7NeQSCwGXiPbylzJ43"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIMLKVhS4kKc8tAa5BrF7NeQSCwGXiPbylzJ43"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIWnMw2yqDli9ewVAIFWJfKc3xuGQUyHgm8jX5"
                      alt="gg"
                      loading="lazy"
                      width={250}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIWnMw2yqDli9ewVAIFWJfKc3xuGQUyHgm8jX5"
                        alt="gg"
                        loading="lazy"
                        width={250}
                        height={300}
                        className=" w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[30vw] md:w-[20vw] md:text-sm">
                  Commercial Complex, Sunjwan{" "}
                </div>
                <Image
                  src="/proj31.jpg"
                  loading="lazy"
                  width={3000}
                  height={200}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="/proj31.jpg"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="/proj31.jpg"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="/proj32.jpg"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="/proj32.jpg"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="/proj33.jpg"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="/proj33.jpg"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] md:text-sm lg:w-[20vw]">
                  Mr Aman Verma Residence
                </div>
                <Image
                  src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI0W7WGBQJZBCdzUpR5I98blMOsxua2NrfQXnP"
                  loading="lazy"
                  width={4000}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIX7TtZM8uDvKodNcTmRw208fBpQse4GC1Jyb7"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIX7TtZM8uDvKodNcTmRw208fBpQse4GC1Jyb7"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI0W7WGBQJZBCdzUpR5I98blMOsxua2NrfQXnP"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI0W7WGBQJZBCdzUpR5I98blMOsxua2NrfQXnP"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] md:text-sm">
                  Residential Building
                </div>
                <Image
                  src="/proj41.jpg"
                  loading="lazy"
                  width={3000}
                  height={200}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="/proj41.jpg"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="/proj41.jpg"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="/proj42.jpg"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="/proj42.jpg"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="/proj43.jpg"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="">
                      <Image
                        src="/proj43.jpg"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] lg:w-[20vw] md:text-sm">
                  Mr Naresh Kumar Residence
                </div>
                <Image
                  src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIcNR5RED1i9eur5VwENSY3yAP40vgkDm7nsI8"
                  loading="lazy"
                  width={3500}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIcNR5RED1i9eur5VwENSY3yAP40vgkDm7nsI8"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIcNR5RED1i9eur5VwENSY3yAP40vgkDm7nsI8"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIWD3ZcWhqDli9ewVAIFWJfKc3xuGQUyHgm8jX"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIWD3ZcWhqDli9ewVAIFWJfKc3xuGQUyHgm8jX"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIFYa5MVGsoMJ9iY2veOW5IF8zStZEDC1afryd"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2 gg"
                      alt="gg"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIFYa5MVGsoMJ9iY2veOW5IF8zStZEDC1afryd"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-3/4"
                        alt="gg"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] md:text-sm">
                  National Center for performing Arts
                </div>
                <Image
                  src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI79sFpMlgJ0scwFBh6vtHy7PdEISQruU5oenj"
                  loading="lazy"
                  width={5000}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIgf7V8cixDuZ3qcKOkw9U5gy80CJTE1XRSG7d"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIgf7V8cixDuZ3qcKOkw9U5gy80CJTE1XRSG7d"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIQVV6OadmJihI2nXL4pu1YHcVo9s0EFSj3yZK"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIQVV6OadmJihI2nXL4pu1YHcVo9s0EFSj3yZK"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIbu9QF5RVGPvuSIdp6yR0ZjT1AgH9q57ONrUW"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIbu9QF5RVGPvuSIdp6yR0ZjT1AgH9q57ONrUW"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIl4Hwn5I76DTBcNSM4zFvWrK2mVP9O5JXyhoe"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIl4Hwn5I76DTBcNSM4zFvWrK2mVP9O5JXyhoe"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIBsRxIuJ1sRzXNAt7oiT5caSuMLIgEjewQU4Z"
                      alt="gg"
                      loading="lazy"
                      width={250}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIBsRxIuJ1sRzXNAt7oiT5caSuMLIgEjewQU4Z"
                        alt="gg"
                        loading="lazy"
                        width={250}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] lg:w-[20vw] md:text-sm">
                  Mr. Rishab Residence
                </div>
                <Image
                  src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIXdDS5l8uDvKodNcTmRw208fBpQse4GC1Jyb7"
                  loading="lazy"
                  width={3500}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIT98W3UZI49wvHgotShBaN1P3cQ8xOCfbzVKR"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIT98W3UZI49wvHgotShBaN1P3cQ8xOCfbzVKR"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIXeDpWhp8uDvKodNcTmRw208fBpQse4GC1Jyb"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIXeDpWhp8uDvKodNcTmRw208fBpQse4GC1Jyb"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-3/4"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIXdDS5l8uDvKodNcTmRw208fBpQse4GC1Jyb7"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIXdDS5l8uDvKodNcTmRw208fBpQse4GC1Jyb7"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>{" "}
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] md:text-sm">
                  School Bishnah
                </div>
                <Image
                  src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIBPVFBcJ1sRzXNAt7oiT5caSuMLIgEjewQU4Z"
                  loading="lazy"
                  width={5000}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIBPVFBcJ1sRzXNAt7oiT5caSuMLIgEjewQU4Z"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIBPVFBcJ1sRzXNAt7oiT5caSuMLIgEjewQU4Z"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className=" w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIACjEeYwhsCHMSfGVTUwzDgqIcW7uFb1mn2eL"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIACjEeYwhsCHMSfGVTUwzDgqIcW7uFb1mn2eL"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className=" w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIQ30SgFmJihI2nXL4pu1YHcVo9s0EFSj3yZKW"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIQ30SgFmJihI2nXL4pu1YHcVo9s0EFSj3yZKW"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI4kLHbYW6lkDaZ0KzdOWFbcGsynNg3VLQ9p5f"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI4kLHbYW6lkDaZ0KzdOWFbcGsynNg3VLQ9p5f"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI0qEjCQJZBCdzUpR5I98blMOsxua2NrfQXnPA"
                      alt="gg"
                      loading="lazy"
                      width={250}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI0qEjCQJZBCdzUpR5I98blMOsxua2NrfQXnPA"
                        alt="gg"
                        loading="lazy"
                        width={250}
                        height={300}
                        className="w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="slide">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="gg">
                <div className="text-center text-[13px] w-[40vw] md:w-[30vw] lg:w-[20vw] md:text-sm">
                  Mr. Vinay Residence
                </div>
                <Image
                  src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihI5uURVQ7HC9QHG4RoL1ixrFbqJWYmnEkcINdB"
                  loading="lazy"
                  width={3500}
                  height={300}
                  className="m-2 gg"
                  alt="gg"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="flex overflow-x-scroll">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIQQcuWDmJihI2nXL4pu1YHcVo9s0EFSj3yZKW"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIQQcuWDmJihI2nXL4pu1YHcVo9s0EFSj3yZKW"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-3/4"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIgKZCkCixDuZ3qcKOkw9U5gy80CJTE1XRSG7d"
                      alt="gg"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="m-2"
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[50vw] h-full">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Image
                        src="https://x0nyubhq8o.ufs.sh/f/QVOgSjymJihIgKZCkCixDuZ3qcKOkw9U5gy80CJTE1XRSG7d"
                        alt="gg"
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DrawerContent>
          </Drawer>{" "}
        </div>
      </div>
    </div>
  );
};

export default Slide;
