import React from "react";
import { useApiHook } from "../../../../hook/customHook";
import { imageUrl } from "../../../../utility/imageUrl";

export default function StorieSection() {
  const { data: stories } = useApiHook("/storie");
  return (
    <>
      <div className="case-studies-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center mb-70">
                <span>Success Stories</span>
                <h2>Our Case Studies</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {stories?.data
              ?.sort((a, b) => b.id - a.id)
              ?.map((item) => (
                <div className="col-lg-4 col-md-6" key={item?.id}>
                  <div
                    className="case-study-card"
                    // data-aos="fade-up"
                    // data-aos-delay="100"
                  >
                    <div className="case-study-img">
                      <img
                        src={imageUrl(item?.image)}
                        alt={item?.title}
                        width="555"
                        height="394"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* <span className="case-study-category">Finance</span> */}
                    </div>
                    <div className="case-study-content">
                      <h4>
                        <a href="#">{item?.title}</a>
                      </h4>
                      <p>{item?.short_description}</p>
                      {/* <div className="case-study-meta">
                      <span className="client-name">
                        <strong>Client:</strong> First Regional Bank
                      </span>
                      <span className="results">+45% efficiency</span>
                    </div> */}
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
