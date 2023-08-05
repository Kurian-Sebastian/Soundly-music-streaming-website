import AdminLayout from "@/components/admin_layout";
import db from "@/db";
import { auth } from "@/lib/random_functions";

export async function getServerSideProps(context) {
    auth(context.req)

    let user = context.req.user;

    let followers = await db.select("*")
        .from("tbl_follower")
        .innerJoin("tbl_login","tbl_login.email","tbl_follower.email")
        .where('tbl_follower.artist_id','=',user.artist_id).andWhere("follow_status",'=',1)

    followers = JSON.parse(JSON.stringify(followers));
    console.log(followers)

    return {
        props: { followers },
    }
}

export default function AdminCustomerView(props) {
    return (
        <AdminLayout>
            <div class="admin-header">
                <h1>Your Followers</h1>
            </div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>follower id</th>
                        <th>follower email</th>
                        <th>follower type</th>
                    </tr>
                    {
                        props.followers.map((follower) => (
                            <tr key={follower.follower_id}>
                                <td>{follower.follower_id}</td>
                                <td>{follower.email}</td>
                                <td>{follower.type}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
