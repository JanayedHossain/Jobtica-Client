import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/loading/Loading";

const Messages = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiousSecure();
  const {
    data: messages = [],
    isLoading,
  } = useQuery({
    queryKey: ["all-employees"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/show-message?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Messages</h1>
      <div>
        {messages.map((item, index) => (
          <div
            className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"}`}
          >
            <div className="chat-header font-semibold text-gray-500">{item.email}</div>
            <div className="chat-bubble bg-primary text-white">{item.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
