import { useState, useEffect } from 'react';
import axios from 'axios';
import { stripHtml } from './Home';
import { Link } from 'react-router-dom';
const Drafts = () => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await axios.get('/drafts');
        setDrafts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDrafts();
  }, []);

  return (
    <div class="table-responsive-sm">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {
          drafts.map((draft) => (
            <tr key={draft.id}>
              <td>  <Link to={`/write?edit=${draft.id}`} state={draft}> {draft.title} </Link> </td>
              <td>{stripHtml(draft.desc)}</td>
              <td>{draft.cat}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Drafts;
