"use client"
import { getVisit } from "@/_actions/getVisits";
import { onDeleteVisit } from "@/_actions/onDeleteVisit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React, { useEffect, useState } from "react";

const SiteVisitPage = () => {
  const [visits, setVisits] = useState<
    {
      id: string;
      userId: string;
      phone: string;
      gmail: string;
    }[]
  >([]);
  useEffect(() => {
    getVisit().then((e) => {
      if (e) {
        if (e !== "Error") {
          e.map((visit) => {
            setVisits((prevVisits) => {
              const exists = prevVisits.find((v) => v.id === visit.id);
              if (exists) return prevVisits;
              return [...prevVisits, visit];
            });
          });
        }
      }
    });
  }, [setVisits, visits]);
  return (
    <div>
      {/* <TabsContent value="visit"> */}
      {visits.length === 0
        ? "No Visits Pending"
        : visits.map((visit) => (
            <div key={visit.id}>
              <Drawer>
                <DrawerTrigger className="font-bold">
                  {" "}
                  {visit.phone} {visit.gmail}
                </DrawerTrigger>
                <DrawerContent className="h-[90vh]">
                  <DrawerHeader>
                    <DrawerTitle></DrawerTitle>
                  </DrawerHeader>
                  <div className="p-0 h-full">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>
                          {visit.gmail} {visit.phone}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className="m-2 bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            onDeleteVisit({ id: visit.id }).then((e) => {
                              if (e) {
                                if (e === "Success") {
                                  window.location.reload();
                                }
                              }
                            });
                          }}
                        >
                          Delete Visit
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

export default SiteVisitPage;
