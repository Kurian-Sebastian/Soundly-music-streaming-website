import AdminLayout from "@/components/admin_layout";
import db from "@/db";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export async function getServerSideProps(context) {

    let customers = await db.select("*")
        .from("tbl_customer")
        .innerJoin("tbl_login", "tbl_customer.email", "tbl_login.email");
    customers = JSON.parse(JSON.stringify(customers));

    return {
        props: { customers }, // will be passed to the page component as props
    }
}

export default function AdminCustomerView(props) {

    let printPDF = async () => {
        const doc = new jsPDF()
        doc.setFontSize(22);
        doc.text("Customer Report", 140, 20);
        doc.setFontSize(13);
        doc.text(`Report date: ${new Date().toDateString()}`, 136, 30);

        //doc.setFontSize(15);
        //doc.text(`Address:`, 10, 40);
        //doc.setFontSize(10);
        //doc.text(`No: 9B2, 9th floor, Wing-2`, 12, 45);
        //doc.text(`Jyothirmaya building,`, 12, 50);
        //doc.text(`Infopark Phase 2`, 12, 55);
        //doc.text(`Brahmapuram P.O`, 12, 60);
        //doc.text(`682303`, 12, 65);
        //doc.text(`Kerala,India`, 12, 70);
        //doc.text(`mail@querybox.xyz`, 12, 75);


        let tableData = props.customers.map(item => {
            //if('full_name' in item){
                //item['full_name'] = (item['status'] ? 'active' : 'inactive')
            //}
            return item;
        })

        tableData = tableData.map(item => {
            return Object.values(item);
        });
        console.log(tableData);

        jsPDF.autoTableSetDefaults({
            headStyles: { fillColor: 0 },
        })

        autoTable(doc, {
            head: [["id","email","name","phone","date added"]],
            startY: 40,
            startX: 10,
            theme: 'grid',
            body:
                tableData,

            didDrawPage: function(data) {

                // Footer
                var str = "Page " + doc.internal.getNumberOfPages();

                doc.setFontSize(10);

                // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                var pageSize = doc.internal.pageSize;
                var pageHeight = pageSize.height
                    ? pageSize.height
                    : pageSize.getHeight();
                doc.text(str, data.settings.margin.left, pageHeight - 10);
            }

        })


        doc.save('report.pdf')
    }

    return (
        <AdminLayout>
            <div class="admin-header">
            <h1>Customers</h1>
            <a onClick={printPDF}>Print Report</a>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Customer id</th>
                        <th>Customer email</th>
                        <th>Customer name</th>
                        <th>Customer phone</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Action</th>
                    </tr>

                    {
                        props.customers.map((customer) => (
                            <tr key={customer.customer_id}>
                                <td>{customer.customer_id}</td>
                                <td>{customer.email}</td>
                                <td>{customer.customer_name}</td>
                                <td>{customer.customer_phone}</td>
                                <td>{customer.status ? "active" : "inactive"}</td>
                                <td>
                                    <a href={"/admin/customer/" + customer.customer_id}>Edit</a>
                                </td>
                                <td>
                                    <a href={"/api/customer/" + customer.email}>{customer.status ? "disable" : "enable"}</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
