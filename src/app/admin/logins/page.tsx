"use client";
import { deleteUser } from "@/_actions/deleteUser";
import { notVerifiedUsers } from "@/_actions/getUnVerifiedUeses";
import { verifyUser } from "@/_actions/verify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "react-day-picker";

const TotalLoginsPage = () => {
  const [logins, setLogin] = useState<
    {
      id: string;
      name: string;
      gmail: string;
      Proof: string | null;
      isReal: boolean | null;
      type: string;
    }[]
  >([]);
  useEffect(() => {
    notVerifiedUsers().then((e) => {
      if (e) {
        if (e !== "No new users") {
          setLogin(e);
        }
      }
    });
  });
  return (
    <div>
      {logins.length === 0
        ? "No new Users"
        : logins.map((user) => (
            <div key={user.id}>
              <Card>
                <CardTitle>
                  <CardHeader>
                    <div>
                      <div>Name: {user.name}</div>
                      <div>Gmail: {user.gmail}</div>
                    </div>
                  </CardHeader>
                </CardTitle>
                <CardContent>
                  <div className="flex items-center justify-around">
                    <div>
                      <div>Type: {user.type}</div>
                      Proof:{" "}
                      <Image
                        src={`${user.Proof}`}
                        alt="gg"
                        loading="lazy"
                        width={500}
                        height={300}
                        className="m-2"
                      />
                    </div>
                    <div>
                      <Button
                        className="bg-green-600 cursor-pointer hover:bg-green-700 m-2"
                        onClick={() => {
                          verifyUser(user.id);
                        }}
                      >
                        Verify
                      </Button>
                      <Button
                        onClick={() => {
                          deleteUser(user.id).then(() => {
                            // console.log(e);
                          });
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
    </div>
  );
};

export default TotalLoginsPage;
