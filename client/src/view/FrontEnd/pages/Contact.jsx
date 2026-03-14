import React from "react";
import { useForm } from "react-hook-form";
import { useApiHook } from "../../../hook/customHook";

export default function Contact() {
  const { createData } = useApiHook("/contact-message");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await createData(data);
    if (res) reset();
  };

  return (
    <section className="contact-section">
      <div className="container">
        {/* Map */}

        <div className="d-none d-sm-block mb-5 pb-4">
          <iframe
            id="map"
            style={{
              height: "480px",
              width: "100%",
              border: 0,
              filter: "grayscale(50%)",
            }}
            src="https://www.openstreetmap.org/export/embed.html?bbox=149.5%2C-32%2C152%2C-30.4&amp;layer=mapnik"
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>

        <div className="row">
          <div className="col-12">
            <h2 className="contact-title">Get in Touch</h2>
          </div>

          {/* Contact Form */}

          <div className="col-lg-8">
            <form
              className="form-contact contact_form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                {/* Message */}

                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      className="form-control w-100"
                      rows="6"
                      placeholder="Enter Message"
                      {...register("message", {
                        required: "Message is required",
                      })}
                    />

                    {errors.message && (
                      <p className="text-danger">{errors.message.message}</p>
                    )}
                  </div>
                </div>

                {/* Name */}

                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your name"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />

                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}

                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter email address"
                      {...register("email")}
                    />

                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}

                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Subject"
                      {...register("subject")}
                    />
                  </div>
                </div>

                {/* Phone */}

                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Phone"
                      {...register("phone")}
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}

              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="button button-contactForm boxed-btn"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}

          <div className="col-lg-3 offset-lg-1">
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-home"></i>
              </span>
              <div className="media-body">
                <h3>Buttonwood, California.</h3>
                <p>Rosemead, CA 91770</p>
              </div>
            </div>

            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-tablet"></i>
              </span>
              <div className="media-body">
                <h3>+1 253 565 2365</h3>
                <p>Mon to Fri 9am to 6pm</p>
              </div>
            </div>

            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-email"></i>
              </span>
              <div className="media-body">
                <h3>support@colorlib.com</h3>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
