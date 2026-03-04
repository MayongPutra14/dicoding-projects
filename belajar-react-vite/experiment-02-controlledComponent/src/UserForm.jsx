import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    // 1. Inisialisasi State
    this.state = {
      username: '',
      email: '',
    };

    // 2. Binding (seperti yang kamu rangkum tadi!)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Best Practice: Gunakan atribut 'name' pada input untuk identifikasi
  handleChange(event) {
    const { name, value } = event.target;
    
    this.setState({
      [name]: value // Menggunakan computed property name
    });
  }

  handleSubmit(event) {
    event.preventDefault(); // Mencegah reload halaman
    console.log("Data yang dikirim:", this.state);
    // Di sini biasanya kita panggil API
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            name="username" // Harus sama dengan nama di state
            value={this.state.username} // Terkoneksi ke state
            onChange={this.handleChange} // Menangkap perubahan
          />
        </div>

        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
          />
        </div>

        <button type="submit">Kirim Data</button>
      </form>
    );
  }
}

export default UserForm;