import AddContacts from 'components/AddContacts/AddContacts';
import Table from 'components/Table/Table';

function Home() {
  return (
    <>
      <section className="App__addContacts">
        <AddContacts />
      </section>
      <section className="App__table">
        <Table />
      </section>
    </>
  );
}

export default Home;
