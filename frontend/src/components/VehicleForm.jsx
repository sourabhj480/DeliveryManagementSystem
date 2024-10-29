import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config'
import {NavBar} from './NavBar'
export const VehicleForm = () => {
    const [vehicle, setVehicle] = useState({
        customer_name: '',
        vehicle_number: '',
        issues: '',
        final_amount: 0.0,
        payment_received: true,
    });

    const [componentOptions, setComponentOptions] = useState([]);
    const [serviceDetails, setServiceDetails] = useState([
        { component: '', component_type: 'new_installed', amount: 0.0 },
    ]);

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}components/get`);
                const data = await response.json();
                const options = data.map(component => ({
                    value: component.id,
                    label: component.name,
                    repair_price: component.repair_price,
                    new_component_price: component.new_component_price,
                }));
                setComponentOptions(options);
            } catch (error) {
                console.error('Error fetching components:', error);
            }
        };

        fetchComponents();
    }, []);

    const handleVehicleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value });
    };

    const handleServiceDetailChange = (index, e) => {
        const { name, value } = e.target;
        const newServiceDetails = [...serviceDetails];

        if (name === 'component') {
            const selectedComponent = componentOptions.find(option => option.value == value);

            if (selectedComponent) {
                newServiceDetails[index].component = value;
                newServiceDetails[index].component_type = 'new_installed';
                newServiceDetails[index].amount = selectedComponent.new_component_price;
            }
        } else {
            newServiceDetails[index][name] = value;
            if (name === 'component_type') {
                const selectedComponent = componentOptions.find(option => option.value == newServiceDetails[index].component);
                if (selectedComponent) {
                    newServiceDetails[index].amount = value === 'repaired' ? selectedComponent.repair_price : selectedComponent.new_component_price;
                }
            }
        }

        setServiceDetails(newServiceDetails);
    };

    const addServiceDetail = () => {
        setServiceDetails([...serviceDetails, { component: '', component_type: 'new_installed', amount: 0.0 }]);
    };

    const deleteServiceDetail = (index) => {
        const newServiceDetails = serviceDetails.filter((_, i) => i !== index);
        setServiceDetails(newServiceDetails);
    };

    const totalAmount = serviceDetails.reduce((total, detail) => total + detail.amount, 0); // Calculate total amount
    const calculateFinalAmount = () => {
        return serviceDetails.reduce((total, detail) => total + parseFloat(detail.amount || 0), 0);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalData = {
            ...vehicle,
            final_amount: calculateFinalAmount(),
            service_details: serviceDetails,
        };

        try {
            const response = await fetch(`${API_BASE_URL}vehicles/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });

            if (response.ok) {
                alert('Vehicle and service details submitted successfully');
                setVehicle({ customer_name: '', vehicle_number: '', issues: '', final_amount: 0.0, payment_received: true });
                setServiceDetails([{ component: '', component_type: 'new_installed', amount: 0.0 }]);
            } else {
                alert('Failed to submit vehicle details');
            }
        } catch (error) {
            console.error('Error submitting vehicle information:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Vehicle Service Form</h2>
            <NavBar/>
            <label>
                Customer Name:
                <input
                    type="text"
                    name="customer_name"
                    value={vehicle.customer_name}
                    onChange={handleVehicleChange}
                    required
                />
            </label>
            <label>
                Vehicle Number:
                <input
                    type="text"
                    name="vehicle_number"
                    value={vehicle.vehicle_number}
                    onChange={handleVehicleChange}
                    required
                />
            </label>
            <label>
                Issues:
                <textarea
                    name="issues"
                    value={vehicle.issues}
                    onChange={handleVehicleChange}
                    required
                />
            </label>
            <label>
                Final Amount:
                <input
                    type="number"
                    name="final_amount"
                    value={totalAmount}
                    readOnly
                    disabled
                />
            </label>
            <label>
                Payment Received:
                <input
                    type="checkbox"
                    name="payment_received"
                    checked={vehicle.payment_received}
                    onChange={(e) => setVehicle({ ...vehicle, payment_received: e.target.checked })}
                />
            </label>

            <h3>Service Details</h3>
            <div className="service-detail-grid">
                <div className="grid-header">Component</div>
                <div className="grid-header">Component Type</div>
                <div className="grid-header">Amount</div>
                <div className="grid-header">Actions</div>

                {serviceDetails.map((detail, index) => (
                    <React.Fragment key={index}>
                        <select
                            name="component"
                            value={detail.component}
                            onChange={(e) => handleServiceDetailChange(index, e)}
                            required
                        >
                            <option value="">Select a component</option>
                            {componentOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <select
                            name="component_type"
                            value={detail.component_type}
                            onChange={(e) => handleServiceDetailChange(index, e)}
                        >
                            <option value="new_installed">New Installed</option>
                            <option value="repaired">Repaired</option>
                        </select>
                        <input
                            type="number"
                            name="amount"
                            value={detail.amount}
                            readOnly
                            disabled
                        />
                        <button type="button" onClick={() => deleteServiceDetail(index)}>Delete</button>
                    </React.Fragment>
                ))}
            </div>
            <button type="button" onClick={addServiceDetail}>
                Add Service Detail
            </button>

            <button style={{ 'margin-left': '8px' }} type="submit">Submit</button>
        </form>
    );
};