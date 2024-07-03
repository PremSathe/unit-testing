import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
        avatar_url: "",
      },
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://api.github.com/users/Sreenivasulu-Kalluru"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const json = await response.json();
      this.setState({
        userInfo: json,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  componentDidUpdate() {
    // console.log('Component Did Update');
  }

  componentWillUnmount() {
    // console.log('Component Will Unmount');
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    const { error } = this.state;

    return (
      <div className="user-card">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <img src={avatar_url} alt={name} />
            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact: @vaasuk24</h4>
          </>
        )}
      </div>
    );
  }
}

export default UserClass;
