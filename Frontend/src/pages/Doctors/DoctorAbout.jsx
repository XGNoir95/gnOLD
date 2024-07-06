import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/formatDate";

const DoctorAbout = () => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 ">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9  ">
            Alim Bin Yeasin
          </span>
        </h3>
        <p className="text_para">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde itaque
          laudantium est totam illo, commodi temporibus maiores explicabo
          reiciendis veniam.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-20px] leading-[30px] text-headingColor font-semibold ">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]  ">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold ">
                {formatDate("10-22-2010")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Square Hospital, Dhaka.
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]  ">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold ">
                {formatDate("10-22-2008")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in Medicine
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Square Hospital, Dhaka.
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-20px] leading-[30px] text-headingColor font-semibold ">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5  ">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formatDate("07-04-2010")} - {formatDate("08-13-2014")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Square Hospital, Dhaka.
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formatDate("07-04-2010")} - {formatDate("08-13-2014")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Square Hospital, Dhaka.
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]  ">

          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
