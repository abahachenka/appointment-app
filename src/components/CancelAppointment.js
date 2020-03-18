const CancelAppointment = () => (
    <main className="page-container container">
        <h1 className="page-title">Please, enter your order number</h1>

        <form action="#" className="cancel-appointment-form">
            <input type="text" placeholder="Order Number" />
            <input type="submit" value="Cancel Appointment" />
        </form>

        <div className="cancel-sample">
            <img src="img/cancel-sample.png" alt="" />
        </div>

    </main>
)

export default CancelAppointment;