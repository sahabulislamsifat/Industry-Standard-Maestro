import AddDivisionModal from "@/components/modules/admin/division/AddDivisionModal";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";

const AddDivision = () => {
  const {
    data: divisions,
    isLoading,
    isError,
  } = useGetDivisionsQuery(undefined);

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Division Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Add and manage tour divisions across Bangladesh.
          </p>
        </div>
        <AddDivisionModal />
      </div>

      {/* Card Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Add a New Division
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Use the button above to add a new division. Each division helps to
          organize and manage tours efficiently.
        </p>

        {/* Division List */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
            Existing Divisions
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Division Name</th>
                  <th className="px-4 py-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      Loading divisions...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-red-500"
                    >
                      Failed to load divisions.
                    </td>
                  </tr>
                ) : divisions && divisions.length > 0 ? (
                  divisions.map((division: any, index: number) => (
                    <tr
                      key={division._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        {division.thumbnail ? (
                          <img
                            src={division.thumbnail}
                            alt={division.name}
                            className="h-12 w-12 object-cover border border-gray-200 dark:border-gray-700"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No image</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {division.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                        {division.description || "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      No divisions added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDivision;
