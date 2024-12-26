import { ReactNode, useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import Pagination from "../../features/components/Pagination";
import FormCreateAttribute from "../../features/admin/FormCreateAttribute";
import { CiEdit } from "react-icons/ci";
import FormCreateValue from "../../features/admin/FormCreateValue";
import FormEditValue from "../../features/admin/FormEditValue";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";

export default function AdminWordAttributes() {
  const page = 1;

  const [data, setData] = useState<WordAttribute[]>([]);
  const [count, setCount] = useState(0);

  const [isModified, setIsModified] = useState(true);

  // const [values, setValues] = useState<AttributeValue[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const token = useSelector(selectCurrentToken);

  async function fetchAttributes() {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);

      const response = await axiosPrivate.get("/admin/wordAttributes", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 200 && Array.isArray(response.data.data)) {
        setData(response.data?.data as WordAttribute[]);
        setCount(response.data?.count as number);

        setIsSuccess(true);
      } else {
        setIsError(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  }

  // async function fetchValues() {
  //   try {
  //     const response = await axiosPrivate.get("/admin/wordAttrValues");

  //     if (response.status === 200 && Array.isArray(response.data.data)) {
  //       setValues(response.data?.data as AttributeValue[]);

  //       setIsSuccess(true);
  //     } else {
  //       setIsError(true);
  //     }
  //   } catch (error) {}
  // }

  useEffect(() => {
    if (isModified) {
      fetchAttributes();
      setIsModified(false);
    }
  }, [isModified]);

  let content: ReactNode;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const rows: (AttributeValue & { attrID: string; attrLabel: string })[] = [];
    data.forEach((attribute) => {
      attribute.values.forEach((value) => {
        rows.push({
          ...value,
          attrID: attribute.id,
          attrLabel: attribute.label,
        });
      });
    });
    content = rows.map((item, index) => (
      <div
        key={item?.id}
        className="flex items-center text-center hover:bg-zinc-100 duration-200 px-1 py-1 border-b-[1px] border-zinc-200"
      >
        <span className="w-[5%]">{index + 1}</span>
        <span className="w-[20%]">{item?.attrLabel}</span>
        <span className="flex-1">{item?.label}</span>
        <span className="w-[20%]">{item?.abbrev}</span>
        <span className="w-[20%]">{item?.shortHand}</span>
        <span className="w-[5%]">
          <button
            title="Edit"
            onClick={() => {
              setEditValue(true);
              setValue(item);
            }}
          >
            <CiEdit size={28} />
          </button>
        </span>
      </div>
    ));
  } else if (isError) {
    content = <p>{"error"}</p>;
  }

  // const attributes = data.map((item) => <div key={item.id}>{item.label}</div>);

  const [add, setAdd] = useState(false);
  const [addValue, setAddValue] = useState(false);

  const [editValue, setEditValue] = useState(false);
  const [value, setValue] = useState<AttributeValue | null>(null);

  return (
    <>
      {/* <div>{attributes}</div> */}
      <div className="flex items-center p-2 bg-zinc-200 text-center rounded-md">
        <span className="w-[5%]">SN</span>
        <span className="w-[20%]">Attribute</span>
        <span className="flex-1">Value</span>
        <span className="w-[20%]">Abbreviation</span>
        <span className="w-[20%]">ShortHand</span>
        <span className="w-[5%]">Edit</span>
      </div>
      <div className="flex-1">{content}</div>
      <div className="flex items-center justify-between">
        <button className="btn-r btn-red" onClick={() => setAdd(true)}>
          Create Attribute
        </button>
        <button className="btn-r btn-red" onClick={() => setAddValue(true)}>
          Add Value
        </button>
        <Pagination count={count} currentPage={page} className="" />
      </div>
      {add && <FormCreateAttribute setAdd={setAdd} />}
      {addValue && (
        <FormCreateValue
          setAdd={setAddValue}
          setModified={setIsModified}
          options={data.map((item) => ({ label: item.label, value: item.id }))}
        />
      )}
      {editValue && value && (
        <FormEditValue
          value={value}
          setModified={setIsModified}
          options={data.map((item) => ({ label: item.label, value: item.id }))}
          setEdit={setEditValue}
        />
      )}
    </>
  );
}
