import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config'
import {NavBar} from './NavBar'

export const ComponentsManager = () => {
    const [components, setComponents] = useState([]);
    const [newComponent, setNewComponent] = useState({ name: '', description: '', repair_price: 0.0, new_component_price: 0.0 });
    const [editingComponent, setEditingComponent] = useState(null);

    useEffect(() => {
        fetchComponents();
    }, []);

    const fetchComponents = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}components/get`);
            const data = await response.json();
            setComponents(data);
        } catch (error) {
            console.error('Error fetching components:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComponent({ ...newComponent, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = editingComponent
                ? await fetch(`${API_BASE_URL}components/update/${editingComponent.id}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(newComponent),
                  })
                : await fetch(`${API_BASE_URL}components/create`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(newComponent),
                  });

            if (response.ok) {
                fetchComponents();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving component:', error);
        }
    };

    const editComponent = (component) => {
        setNewComponent(component);
        setEditingComponent(component);
    };

    const deleteComponent = async (id) => {
        if (window.confirm('Are you sure you want to delete this component?')) {
            try {
                await fetch(`${API_BASE_URL}components/delete/${id}`, {
                    method: 'DELETE',
                });
                fetchComponents();
            } catch (error) {
                console.error('Error deleting component:', error);
            }
        }
    };

    const resetForm = () => {
        setNewComponent({ name: '', description: '', repair_price: 0.0, new_component_price: 0.0 });
        setEditingComponent(null);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                
            <h2>Components Manager</h2>
            <NavBar/>
                <label>
                    Name:
                    <input type="text" name="name" value={newComponent.name} onChange={handleInputChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={newComponent.description} onChange={handleInputChange} required />
                </label>
                <label>
                    Repair Price:
                    <input type="number" name="repair_price" value={newComponent.repair_price} onChange={handleInputChange} required />
                </label>
                <label>
                    New Component Price:
                    <input type="number" name="new_component_price" value={newComponent.new_component_price} onChange={handleInputChange} required />
                </label>
                <button type="submit">{editingComponent ? 'Update Component' : 'Add Component'}</button>
                {editingComponent && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            <h3>Existing Components</h3>
            <ul>
                {components.map((component) => (
                    <li key={component.id}>

                        <strong>{component.name}</strong> - {component.description} (Repair Price: {component.repair_price}, New Price: {component.new_component_price})
                        <button style={{ 'margin-left': '8px' }} onClick={() => editComponent(component)}>Edit</button>
                        <button style={{ 'margin-left': '8px' }} onClick={() => deleteComponent(component.id)}>Delete</button>
                        <br></br><br></br>

                    </li>
                ))}
            </ul>
        </div>
    );
};