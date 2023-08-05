import AdminLayout from "@/components/admin_layout";
import db from "@/db";

export async function getServerSideProps(context) {

    let publishers = await db.select("*")
        .from("tbl_publisher")
        .innerJoin("tbl_login", "tbl_publisher.email", "tbl_login.email");

    publishers = JSON.parse(JSON.stringify(publishers));

    return {
        props: { publishers }, // will be passed to the page component as props
    }
}

export default function AdminPublisherView(props) {
    return (
        <AdminLayout>
            <h1>Publishers</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Publisher id</th>
                        <th>email</th>
                        <th>name</th>
                        <th>phone</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Action</th>
                    </tr>

                    {
                        props.publishers.map((user) => (
                            <tr key={user.publisher_id}>
                                <td>{user.publisher_id}</td>
                                <td>{user.email}</td>
                                <td>{user.publisher_name}</td>
                                <td>{user.publisher_phone}</td>
                                <td>{user.status ? "active" : "inactive"}</td>
                                <td>
                                    <a href={"/admin/publisher/" + user.publisher_id}>Edit</a>
                                </td>
                                <td>
                                    <a href={"/api/customer/" + user.email}>{user.status ? "disable" : "enable"}</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
