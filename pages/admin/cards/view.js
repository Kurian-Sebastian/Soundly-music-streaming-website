import AdminLayout from "@/components/admin_layout";
import db from "@/db";

export async function getServerSideProps(context) {

    let cards = await db.select("*")
        .from("tbl_card")
        .innerJoin("tbl_artist","tbl_artist.artist_id","tbl_card.artist_id")
    cards = JSON.parse(JSON.stringify(cards));
    console.log(cards);

    return {
        props: { cards }, // will be passed to the page component as props
    }
}

export default function AdminCustomerView(props) {
    return (
        <AdminLayout>
            <div class="admin-header">
            <h1>Cards</h1>
            </div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>Card id</th>
                        <th>Card No</th>
                        <th>Card Name</th>
                        <th>Artists Name</th>
                        <th>Card Expiry</th>
                    </tr>

                    {
                        props.cards.map((card) => (
                            <tr key={card.card_id}>
                                <td>{card.card_id}</td>
                                <td>{card.card_number}</td>
                                <td>{card.card_name}</td>
                                <td>{card.artist_name}</td>
                                <td>{card.card_expiry}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
