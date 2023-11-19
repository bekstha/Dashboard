import { useEffect, useMemo, useState } from "react";
import useContact from "../hooks/useContact";
import { db } from "../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import LoadingScreen from "../components/LoadingScreen";

const Contact = () => {
  const { contact, setContact } = useContact();
  const [loading, setLoading] = useState(true);

  // Memoize the initial form data
  const initialFormData = useMemo(
    () => ({
      email: contact[0]?.email || "",
      phoneNumber: contact[0]?.phoneNumber || "",
      streetAddress: contact[0]?.streetAddress || "",
      postalCode: contact[0]?.postalCode || "",
      city: contact[0]?.city || "",
      country: contact[0]?.country || "",
      facebookUrl: contact[0]?.facebookUrl || "",
      instagramUrl: contact[0]?.instagramUrl || "",
      tripadvisorUrl: contact[0]?.tripadvisorUrl || "",
    }),
    [contact]
  );

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // Check if contact data is loaded
    if (contact.length > 0) {
      setLoading(false);
    }
  }, [contact]);

  useEffect(() => {
    // Update form data when the contact information changes
    setFormData(initialFormData);
  }, [contact, initialFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Only update the document if there are changes
      if (!isFormDataUnchanged()) {
        const docRef = doc(db, "ContactInformation", contact[0]?.id);
        await updateDoc(docRef, formData);
        // Refresh the data after updating
        setContact([{ id: contact[0]?.id, ...formData }]);
        console.log("Document updated successfully!");
      } else {
        console.log("No changes to save.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const isFormDataUnchanged = () => {
    return JSON.stringify(formData) === JSON.stringify(initialFormData);
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="bg-slate-100 p-5 rounded-xl text-blue-950 ">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-5">
          <label className="mb-3 block text-base font-medium text-left">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={`${contact[0]?.email}`}
            value={formData.email}
            onChange={handleInputChange}
            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-5">
          <label className="mb-3 block text-base font-medium text-left">
            Phone Number
          </label>
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            onChange={handleInputChange}
            value={formData.phoneNumber}
            placeholder={`+${contact[0]?.phoneNumber}`}
            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="-mx-3 flex flex-wrap text-left">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-left">
                Street Address
              </label>
              <input
                type="string"
                name="streetAddress"
                id="streetAddress"
                placeholder={`${contact[0]?.streetAddress}`}
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-left">
                Postal Code
              </label>
              <input
                type="number"
                name="postalCode"
                id="postalCode"
                placeholder={`${contact[0]?.postalCode}`}
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>

        <div className="-mx-3 flex flex-wrap text-left">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-left">
                City
              </label>
              <input
                type="string"
                name="city"
                id="city"
                placeholder={`${contact[0]?.city}`}
                value={formData.city}
                onChange={handleInputChange}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-left">
                Country
              </label>
              <input
                type="string"
                name="country"
                id="country"
                placeholder={`${contact[0]?.country}`}
                value={formData.country}
                onChange={handleInputChange}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-3 block text-base font-medium text-left">
            Facebook
          </label>
          <input
            type="string"
            name="facebookUrl"
            id="facebook"
            placeholder={`${contact[0]?.facebookUrl}`}
            value={formData.facebookUrl}
            onChange={handleInputChange}
            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-5">
          <label className="mb-3 block text-base font-medium text-left">
            Instagram
          </label>
          <input
            type="string"
            name="instagramUrl"
            id="instagram"
            placeholder={`${contact[0]?.instagramUrl}`}
            value={formData.instagramUrl}
            onChange={handleInputChange}
            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-5">
          <label className="mb-3 block text-base font-medium text-left">
            Trip Advisor
          </label>
          <input
            type="string"
            name="tripadvisorUrl"
            id="tripadvisor"
            placeholder={`${contact[0]?.tripadvisorUrl}`}
            value={formData.tripadvisorUrl}
            onChange={handleInputChange}
            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className={`w-48 p-5 rounded-xl text-white ${
              isFormDataUnchanged() ? "bg-gray-500" : "bg-blue-950"
            }`}
            disabled={isFormDataUnchanged()}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
