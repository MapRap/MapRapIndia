"use client";
import { createAdmin } from "@/_actions/createAdmin";
import { deleteAdmin } from "@/_actions/deleteAdmin";
import { getAdmins } from "@/_actions/getAdmins";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

const EditAdminPage = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gmail, setGmail] = useState("");
  const [admins, setAdmins] = useState<
    {
      id: string;
      name: string;
      gmail: string;
      password: string;
      otp: string | null;
      isVerified: boolean | null;
      otpExpiry: Date;
      type: string;
      Phone: string;
      paymentId: string;
      country: boolean;
      stars: string | null;
    }[]
  >();
  useEffect(() => {
    getAdmins().then((e) => {
      if (e) {
        if (e !== "Error") {
          setAdmins(e);
        }
      }
    });
  }, [message]);
  return (
    <div className="">
      <div>
        <div className="text-3xl text-center">List of admins</div>
        {admins && (
          <div className="h-[50vh] overflow-y-scroll">
            {admins.length === 0 ? (
              <div>No admins</div>
            ) : (
              <div>
                <div>{message}</div>
                {admins.map((admin) => {
                  return (
                    <div
                      key={admin.id}
                      className="flex gap-3 border-y-black border-2 items-center justify-center py-2 hover:bg-slate-100"
                    >
                      <div>{admin.name}</div>
                      <div>{admin.gmail}</div>
                      <div>{admin.Phone}</div>
                      <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => {
                          deleteAdmin({ id: admin.id }).then((e) => {
                            if (e) {
                              if (e === "Success") {
                                setMessage("Delete successful");
                              }
                            }
                          });
                        }}
                      >
                        Delete Admin
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <div>Add Admin</div>
                <div>Password: MapRap@8899</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div>Name</div>
                <Input
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <div>Phone</div>
                <Input
                  placeholder="phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div>
                <div>Gmail</div>
                <Input
                  placeholder="gmail"
                  onChange={(e) => {
                    setGmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <Button
                  className="m-2"
                  onClick={() => {
                    createAdmin({ name, gmail, phone }).then((e) => {
                      if (e) {
                        if (e === "Success") {
                          window.location.reload();
                        }
                      }
                    });
                  }}
                >
                  <Plus className="w-4" />
                  Create Admin
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditAdminPage;
