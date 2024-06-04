import {FC, useEffect, useState} from "react";
import { appAPI } from "@/utils/appAPI";

interface APIImageComponentProps {
  imageId: number;
  type: string;
  thumbnail?: boolean;
  full?: boolean;
}

const APIImageComponent: FC<APIImageComponentProps> = ({
    imageId,
    type,
    thumbnail,
    full,
}) => {
  const [imageData, setImageData] = useState<string>("");
  const [defaultImg, setDefaultImage] = useState("question.jpg");

  useEffect(() => {
    const downloadImage = async () => {
      try {
        if (!imageId) {
          setImageData("");
          if (type === "") {
            setDefaultImage("");
          } else {
            setDefaultImage("question.jpg");
          }
        } else {
            if (!thumbnail) {
                const response = await appAPI.get(
                    `/api/image/${imageId}`,
                    {
                    responseType: "arraybuffer",
                }
            );

            if (response.status === 200) {
                const base64Image = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );

              const imageSrc = `data:image/png;base64,${base64Image}`;

              setImageData(imageSrc);
            } else {
              console.error("Wystąpił błąd podczas wyświetlania zdjęcia");
              return "Wystąpił błąd podczas wyświetlania zdjęcia";
            }
          } else if (thumbnail) {
            try {
              const response = await appAPI.get(
                `/api/image/${imageId}?thumbnail=true`,
                {
                  responseType: "arraybuffer",
                }
              );

              if (response.status === 200) {
                const base64Image = btoa(
                  new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );

                const imageSrc = `data:image/png;base64,${base64Image}`;

                setImageData(imageSrc);
              }
            } catch (error: any) {
              if (error.response && error.response.status === 404) {
                const response = await appAPI.get(`/api/image/${imageId}`, {
                  responseType: "arraybuffer",
                });

                if (response.status === 200) {
                  const base64Image = btoa(
                    new Uint8Array(response.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  );

                  const imageSrc = `data:image/png;base64,${base64Image}`;

                  setImageData(imageSrc);
                } else {
                  console.error("Wystąpił błąd podczas wyświetlania zdjęcia");
                  return "Wystąpił błąd podczas wyświetlania zdjęcia";
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
      (async () => {
          await downloadImage();
      })();
  }, [imageId]);

  return (
    <>
      {imageData !== "" ? (
        <img
          className={` ${
            full ? "w-full opacity-25 fixed left-0 top-0 -z-10" : "relative"
          } object-fill object-center h-auto w-full`}
          src={imageData}
          alt="photo"
        />
      ) : (
        <img
          className={`${
            full ? "w-full opacity-25 fixed left-0 top-0 -z-10" : "relative"
          }  object-fill object-center h-auto w-full`}
          src={`/assets/common/${defaultImg}`}
          alt="defaultPhoto"
        />
      )}
    </>
  );
};

export default APIImageComponent;