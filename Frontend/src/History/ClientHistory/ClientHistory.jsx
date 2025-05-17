import React, { useEffect } from 'react'
import { usePersonContext } from '../../ContextApi/CPCContext'
import { useNavigate } from 'react-router-dom';

export default function ClientHistory() {
  const { persons } = usePersonContext();
  const [clients, setClients] = React.useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getClients = persons.filter((person) => person.status === 'client')
    setClients(getClients)
  }, [persons])

  const seeClientHistory=(name,id)=>{
      navigate(`/client-history/${name}`,{state:{id:id}})
  }


    // Search functionality to filter items based on name or category
  const search = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll("#client-list > li");
    items.forEach((item) => {
      const title = item.getAttribute("data-title").toLowerCase();
      if (title.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Clients</h2>
          {/* Search box */}
          <input
            type="text"
            name="search-items"
            id="searchBox"
            className="border-2 border-gray-800 rounded-lg p-1 w-1/4 mb-6"
            onChange={(e) => search(e)}
            placeholder="Search Clients"
          />
      {clients.length === 0 ? (
        <div className="text-gray-500">No clients found.</div>
      ) : (
        <ul id='client-list' className="grid grid-cols-1 md:grid-cols</div>-2 lg:grid-cols-3 gap-4">

          {clients.map((client) => (
            <li
              key={client.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col gap-2 border hover:shadow-lg transition"
              onClick={()=>seeClientHistory(client.name,client._id)}
              data-title={client.name}
            >
              <span className="text-lg font-semibold">{client.name}</span>
              <span className="text-gray-600">{client.email}</span>
              {/* Add more client details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
