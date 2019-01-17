import React, { Fragment } from "react";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import PropTypes from "prop-types";
import SignUpForm from "../components/auth";
import { API } from "../constants";
import postDataThunkNoHeader from "../redux/thunks";
import {
  signUpActionCreatorSuccess,
  signUpActionCreatorFailure
} from "../redux/actions/authentication";
import CircularProgressLoader from "../components/progress";

class AuthView extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    isSignUp: true,
    loader: {
      success: false,
      loading: false
    }
  };

  componentWillReceiveProps(nextProps) {
    const { signUpData, signUpErrors } = nextProps;
    if (signUpData || signUpErrors) {
      // eslint-disable-next-line
      signUpData
        ? notify.show(signUpData.Message, "success", 6000)
        : notify.show(this.extractError(signUpErrors.errors), "error", 4000);
      this.setState({ loader: { loading: false } });
    }
  }

  extractError = errors => {
    const errs = Object.keys(errors).map(key => errors[key]);
    return errs && errs.length > 1 ? errs[0] : errs;
  };

  handleChangeFormStatus = event => {
    event.preventDefault();
    const { isSignUp } = this.state;
    const newStatus = isSignUp ? false : true;
    this.setState({ isSignUp: newStatus });
  };

  handleLogin = event => {
    event.preventDefault();

    const {
      postDataThunkNoHeader,
      signUpActionCreatorSuccess,
      signUpActionCreatorFailure
    } = this.props;

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    this.setState({ errors: {} });
    postDataThunkNoHeader(
      API.LOGIN_URL,
      {
        user: {
          username,
          password
        }
      },
      signUpActionCreatorSuccess,
      signUpActionCreatorFailure,
      "post"
    );

    this.setState({ errors: this.props.errors });
    this.setState({ loader: { loading: true } });
  };

  handleSignup = event => {
    event.preventDefault();
    const {
      postDataThunkNoHeader,
      signUpActionCreatorSuccess,
      signUpActionCreatorFailure
    } = this.props;

    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    postDataThunkNoHeader(
      API.SIGN_UP_URL,
      {
        user: {
          username,
          email,
          password
        }
      },
      signUpActionCreatorSuccess,
      signUpActionCreatorFailure,
      "post"
    );
    this.setState({ loader: { loading: true } });
  };

  render() {
    const { loader, errors, isSignUp } = this.state;
    const onSubmit = isSignUp ? this.handleSignup : this.handleLogin;
    return (
      <Fragment>
        <CircularProgressLoader {...loader} />
        <SignUpForm
          onSubmit={onSubmit}
          {...this.state}
          isSignUp={isSignUp}
          errors={errors}
          handleLogin={this.handleChangeFormStatus}
        />
      </Fragment>
    );
  }
}

AuthView.propTypes = {
  postDataThunkNoHeader: PropTypes.func.isRequired,
  signUpActionCreatorSuccess: PropTypes.func.isRequired,
  signUpActionCreatorFailure: PropTypes.func.isRequired,
  signUpData: PropTypes.shape({
    Message: PropTypes.string,
    token: PropTypes.string
  }),
  signUpErrors: PropTypes.shape({
    errors: PropTypes.shape()
  })
};

AuthView.defaultProps = {
  signUpErrors: {},
  signUpData: {}
};

const actionCreators = {
  postDataThunkNoHeader,
  signUpActionCreatorSuccess,
  signUpActionCreatorFailure
};
const mapStateToProps = state => ({
  signUpData: state.authReducer.signUpSuccess,
  signUpErrors: state.authReducer.signUpFailure,
  auth: state.loginreducer
});

export { AuthView as AuthViewTest };

export default connect(
  mapStateToProps,
  actionCreators
)(AuthView);