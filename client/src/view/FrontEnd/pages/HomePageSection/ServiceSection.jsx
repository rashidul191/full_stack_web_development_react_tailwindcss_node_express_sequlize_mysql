import React from "react";
import { useApiHook } from "../../../../hook/customHook";
import { imageUrl } from "../../../../utility/imageUrl";

export default function ServiceSection() {
  const { data: services } = useApiHook("/service");
  return (
    <>
      <div className="categories-area section-padding30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle mb-70">
                <span className="section-label">Our Top Services</span>
                <h2>Our Best Services</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {services
              ?.sort((a, b) => b.id - a.id)
              ?.map((item) => (
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div
                    className="single-cat text-center mb-50"
                    // data-aos="fade-up"
                    // data-aos-delay="100"
                  >
                    <div className="w-full mx-auto text-center">
                      <img
                        className="img-fluid d-block mx-auto"
                        src={imageUrl(item?.image)}
                        alt={item?.name}
                      />
                    </div>
                    <div className="cat-cap mt-2">
                      <h3>
                        {item?.name}
                        {/* <a href="https://preview.colorlib.com/theme/consultingbiz/services.html">
                          Strategy Planning{" "}
                        </a> */}
                      </h3>
                      <p>
                        {item?.content?.length > 100
                          ? item?.content?.slice(0, 100) + "..."
                          : item?.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
