import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { collectAction } from '../../actions';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Search from '../../components/Search';
import ModalCollection from '../../components/ModalCollection';

class AddCollection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
			search: '',
			show: false,
			item: {},
    }
  }

  submitSearch = () => {
		this.props.getNasaList(this.state.search);
  };

  inputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	};
	
	closeModal = () => {
		this.setState({
			show: false,
			item: {},
		});
	}

	openModalAddCollection = (data) => {
		this.setState({
			show: true,
			item: data,
		});
	}

	saveCollection = (row, fieldUpdate) => {
		_.head(row.data).title = fieldUpdate.title;
		_.head(row.data).description = fieldUpdate.description;
		const collectionList = JSON.parse(localStorage.getItem('collectionList'));
		collectionList.push(row);
  	localStorage.setItem('collectionList', JSON.stringify(collectionList));

		this.closeModal();
		this.props.history.push('/');
	}
 
  render() {
		const {loading, nasaList} = this.props;
		const {show, item} = this.state;
    return (
      <div>
				<ModalCollection
					titleModal="Add Collection"
					textAction="Add to collection"
					item={item}
					display={show}
					closeModal={this.closeModal}
					submitCollection={(data) => this.saveCollection(item, data)}
				/>
				<div className="link-section">
					<Link to="/">
            <span className="back-link">
							<Icon classes="small-icon back" />
							Back to collection
						</span>
          </Link>
        </div>
        <div className="top-info">
          <h2>Search from Nasa</h2>
        </div>
        <Search
					name="search"
					id="search"
          valueSearch={this.state.search}
					onChange={this.inputChange}
					onSubmit={this.submitSearch}
        />
        <div className="main-content">
          <ul className="list-collection-nasa">
						{_.isEmpty(nasaList.data) && !loading && <li className="box-collection"><span>No Data</span></li>}
						{loading && <span>Searching...</span>}
						{!_.isEmpty(nasaList.data) && nasaList.data.collection.items.map((item, index) => (
							<li className="box-collection" key={index}>
								<div className="box-image">
									<img src={_.head(item.links).href} alt={_.head(item.data).title} />
								</div>
								<div className="box-information">
									<div className="heading-box">
										<div className="author">{_.head(item.data).center}</div>
										<div className="date-publish">{moment(_.head(item.data).date_created).format('Do MMM YYYY')}</div>
									</div>
									<div className="detail-box">
										<h3 className="title">{_.head(item.data).title}</h3>
										<p className="description">{_.head(item.data).description}</p>
									</div>
									<div className="buttons-action">
										<Button 
											classes="add-to-collection"
											icon={<Icon classes="add" />}
											child={`Add to NASA collection`}
											onClick={() => this.openModalAddCollection(item)}
										/>
									</div>
								</div>
            	</li>
						))}
          </ul>
        </div>
      </div>
    );
  }
}

AddCollection.propTypes = {
	loading: PropTypes.bool.isRequired,
	nasaList: PropTypes.object.isRequired,
	getNasaList: PropTypes.func.isRequired,
	addCollection: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { collectionReducer } = state;
  return {
		loading: collectionReducer.get('loading'),
		nasaList: collectionReducer.get('nasaList'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
		getNasaList: (param) => dispatch(collectAction.getNasaList(param)),
		addCollection: (item) => dispatch(collectAction.addCollection(item)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCollection);