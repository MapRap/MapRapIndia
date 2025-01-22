"use client";
import { onPaintingDelete } from "@/_actions/deletePainting";
import { getPaintings } from "@/_actions/getPaintings";
import { publishPaint } from "@/_actions/publishPainting";
import { unPublishPainting } from "@/_actions/unpublicPainting";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const PaintingsAdminPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [paintings, setPaintings] = useState<
    {
      id: string;
      title: string;
      description: string;
      clientPrice: number;
      totalPrice: number;
      givenBy: string;
      imageUrl: string;
      published: boolean;
      paid: boolean;
    }[]
  >([]);
  useEffect(() => {
    getPaintings().then((e) => {
      if (e) {
        if (e !== "No paintings") {
          e.map((paint) => {
            setPaintings((prevPaintings) => {
              const exists = prevPaintings.find((p) => p.id === paint.id);
              if (exists) return prevPaintings;
              return [...prevPaintings, paint];
            });
          });
        }
      }
    });
  }, [paintings, setPaintings]);
  const publishPainting = async ({ paintingId }: { paintingId: string }) => {
    try {
      const data = await publishPaint({
        id: paintingId,
        totalPrice: totalPrice,
      });
      if (!data) {
        console.log("Error");
      } else if (data === "Timeout! Please try again") {
        console.log(data);
      } else if (data === "success") {
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const unPub = async ({ id }: { id: string }) => {
    try {
      const success = await unPublishPainting({ id: id });
      if (!success) {
        console.log("Error");
      } else if (success === "Error! Please try again") {
        console.log(success);
      } else if (success === "success") {
        return success;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onDelete = async ({ id }: { id: string }) => {
    try {
      const result = await onPaintingDelete({ id });
      if (result === "Error! Please try again") {
        console.log("error");
      } else if (result === "Succefully deleted painting") {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* <TabsContent value="paintings"> */}
      {paintings.length === 0
        ? "No paintings"
        : paintings.map((painting) => (
            <div key={painting.id}>
              <Drawer>
                <DrawerTrigger className="font-bold">
                  {" "}
                  {painting.title}
                </DrawerTrigger>
                <DrawerContent className="h-3/4">
                  <DrawerHeader>
                    <DrawerTitle></DrawerTitle>
                  </DrawerHeader>
                  <div className="p-0 h-full">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>{painting.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div>{painting.description}</div>
                        <div>
                          <Image
                            src={`${painting.imageUrl}`}
                            width={300}
                            height={300}
                            alt="painting"
                          />
                        </div>
                        <div className="my-2">
                          Client price : Rs {painting.clientPrice}
                        </div>
                        <div className="my-2">Paid : {`${painting.paid}`}</div>
                        <Input
                          className="hover:border-slate-400"
                          placeholder="Add price"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            setTotalPrice(value);
                          }}
                        />
                        {painting.published === false ? (
                          <Button
                            className="bg-blue-700 hover:bg-blue-800 m-2"
                            onClick={() => {
                              publishPainting({
                                paintingId: painting.id,
                              }).then((e) => {
                                if (e === "success") {
                                  window.location.reload();
                                }
                              });
                            }}
                          >
                            Publish Painting
                          </Button>
                        ) : (
                          <Button
                            className="m-2 bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              unPub({ id: painting.id }).then((e) => {
                                if (e === "success") {
                                  window.location.reload();
                                }
                              });
                            }}
                          >
                            Unpublish Painting
                          </Button>
                        )}
                        <Button
                          className="m-2 bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            onDelete({ id: painting.id });
                          }}
                        >
                          Delete painting
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          ))}
      {/* </TabsContent> */}
    </div>
  );
};

export default PaintingsAdminPage;
