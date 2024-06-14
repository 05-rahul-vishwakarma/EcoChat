"use client"

import { PersonOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


function Profile() {
  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { error },
  } = useForm();

  const { data: session } = useSession();
  const user = session?.user;
  const [username, updateUsername] = useState();

  useEffect(() => {
    if (user) {
      updateUsername(user.username);
      reset({
        profileImage: user?.profileImage,
      });
    }
  }, [user])

  const uploadPhoto = (result) => {
    setValue("profileImage", result?.info?.secure_url);
  };

  const updateUser = async (data) => {
   alert("yeah working")
    try {
      let config = {
        method: "POST",
        contentType: "application/json",
        body: JSON.stringify(data)
      }
      let res = await fetch(`api/user/${user._id}/upload`,config);
      res = await res.json()
      console.log(res);

    } catch (error) {
       console.log(error);
    }

  }


  return (
    <div className="profiProfile mt-6 ">
      <h1 className="text-heading3-bold text-center ">Edit Your Profile</h1>

      <form className="mt-4 h-min p-4 max-lg:w-[100%] md:w-[40%] w-[40%] mr-auto ml-auto" onSubmit={handleSubmit(updateUser)} >
        <div className="input">
          <input
            {...register("username", {
              required: "Username is required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Username must be at least 3 characters";
                }
              },
            })}
            type="text"
            value={username}
            placeholder="Username"
            className="input-field bg-transparent"
          />
          <PersonOutline sx={{ color: "#737373" }} />
        </div>
        {error?.username && (
          <p className="text-red-500">{error.username.message}</p>
        )}

        <div className="flex items-center justify-between my-4 ">
          <Image
            src={
              watch("profileImage") ||
              user?.profileImage ||
              "/person.jpg"
            }
            width={100}
            height={100}
            alt="profile"
            className="w-36 h-36 object-cover rounded-full "
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={uploadPhoto}
            uploadPreset="gqe6co3c"
          >
            <p className="text-body-bold">
              Upload new photo</p>
          </CldUploadButton>
        </div>

        <button className="btn w-full " type="submit">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Profile;