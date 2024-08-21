/* eslint-disable react/prop-types */

export default function TableData({ data }) {
    // Get the keys from the first object in the data array to create table headers
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} scope="col" className="px-6 py-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={`bg-white ${rowIndex % 2 === 0 ? 'dark:bg-gray-800' : 'dark:bg-gray-700'} border-b dark:border-gray-700`}>
                            {headers.map((header) => (
                                <td key={header} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
