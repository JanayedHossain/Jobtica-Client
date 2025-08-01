import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiousSecure";
import useAuth from "../../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import Loading from "../../../components/loading/Loading";

const WorkSheet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const [selectedDate, setSelectedDate] = useState(new Date());


  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [editDate, setEditDate] = useState(new Date());

  const {
    data: works = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["worksData", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/works?email=${user.email}`);
      return result.data;
    },
  });


  const onSubmit = (data) => {
    const workData = {
      userEmail: user.email,
      employeeName: user.displayName,
      task: data.task,
      hoursWorked: data.hours,
      date: selectedDate,
    };

    axiosSecure
      .post(`/works?email=${user.email}`, workData)
      .then(() => {
        toast.success("Added Successfully");
        refetch();
        reset();
        setSelectedDate(new Date());
      })
      .catch((err) => {
        console.error(err);
        toast.error("Add failed");
      });
  };


  const handleDelete = (id) => {
    axiosSecure
      .delete(`/works/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("Deleted successfully");
          refetch();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Delete failed");
      });
  };


  const handleEdit = (work) => {
    setEditId(work._id);
    setEditData(work);
    setEditDate(new Date(work.date));
    setIsEditOpen(true);
  };


  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedWork = {
      task: e.target.task.value,
      hoursWorked: Number(e.target.hours.value),
      date: editDate,
    };

    axiosSecure
      .put(`/works/${editId}`, updatedWork)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Updated successfully");
          setIsEditOpen(false);
          refetch();
        } else {
          toast.info("No changes made");
        }
      })
      .catch(() => {
        toast.error("Update failed");
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pb-16">
      <h2 className="text-2xl font-bold mb-4">
        Work <span className="text-primary">Sheet</span>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-gray-200 p-4 rounded-2xl"
      >
        <div className="flex flex-col">
          <label>Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="input input-bordered focus:outline-none w-full"
          />
        </div>

        <div>
          <label>Task</label>
          <select
            {...register("task", { required: true })}
            className="select select-bordered focus:outline-none w-full"
          >
            <option value="">Select Task</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
          </select>
          {errors.task && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div>
          <label>Hours Worked</label>
          <input
            type="number"
            min={1}
            {...register("hours", { required: true })}
            className="input input-bordered focus:outline-none w-full"
          />
          {errors.hours && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      {works.length > 0 ? (
        <div className="mt-14 overflow-x-auto">
          <table className="table w-full border border-gray-200 ">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Hours</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...works]
                .sort((a, b) => new Date(b.date) - new Date(a.date)) 
                .map((work, index) => (
                  <tr
                    key={work._id}
                    className="hover:border-primary  hover:text-primary transition-all duration-200"
                  >
                    <td>{index + 1}</td>
                    <td className="truncate">{work.task}</td>
                    <td>{work.hoursWorked}</td>
                    <td className="truncate">
                      {new Date(work.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="flex gap-2">
                      <button
                        onClick={() => handleEdit(work)}
                        className="btn btn-sm btn-outline"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(work._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="pt-5">No Work Records Found</div>
      )}
      <input
        type="checkbox"
        id="edit-modal"
        className="modal-toggle"
        checked={isEditOpen}
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative h-[70%] flex flex-col justify-center">
          <label
            htmlFor="edit-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setIsEditOpen(false)}
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold mb-4 absolute top-3 text-center">
            Edit Work
          </h3>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Task</span>
              </label>
              <select
                name="task"
                defaultValue={editData?.task}
                className="select select-bordered w-full"
                required
              >
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Content">Content</option>
                <option value="Paper-work">Paper-work</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Hours Worked</span>
              </label>
              <input
                type="number"
                name="hours"
                defaultValue={editData?.hoursWorked}
                className="input input-bordered w-full"
                required
                min={0}
              />
            </div>

            <div>
              <label className="label flex">
                <span className="label-text">Date</span>
              </label>
              <DatePicker
                selected={editDate}
                onChange={(date) => setEditDate(date)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkSheet;
