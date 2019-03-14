import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import ModalCollection from '../../components/ModalCollection';

class Collection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
			items: {},
      collectionList: JSON.parse(localStorage.getItem('collectionList')),
    }
  }

  addFavorite = (data) => {
    const collections = this.state.collectionList;
    for(let i = 0; i < collections.length; i++) {
      if(_.head(collections[i].data).nasa_id === data.nasa_id) {
        collections[i].hasFavorite = true;
      }
    }
  	this.setState({
      collectionList: collections,
    });

    localStorage.setItem('collectionList', JSON.stringify(collections));
  };

  removeItem = (row) => {
    const collections = this.state.collectionList;
    const index = collections.indexOf(row);
    collections.splice(index, 1);

    this.setState({
      collectionList: collections,
    });

    localStorage.setItem('collectionList', JSON.stringify(collections));
  }

  checkHasFavorite = (data) => {
    if(data.hasOwnProperty('hasFavorite') && data.hasFavorite === true) {
      return true;
    }
    return false;
  }

  updateCollection = (row, fields) => {
    const collections = this.state.collectionList;
    for(let i = 0; i < collections.length; i++) {
      if(_.head(collections[i].data).nasa_id === _.head(row.data).nasa_id) {
        _.head(collections[i].data).title = fields.title;
        _.head(collections[i].data).description = fields.description;
      }
    }
  	this.setState({
      collectionList: collections,
    });

    localStorage.setItem('collectionList', JSON.stringify(collections));
    this.closeModal();
  }

  closeModal = () => {
		this.setState({
			show: false,
			items: {},
		});
	}

	openModalCollection = (data) => {
		this.setState({
			show: true,
			items: data,
		});
	}
 
  render() {
    const {collectionList} = this.state;
    const {show, items} = this.state;
    return (
      <div>
        <ModalCollection
					titleModal="Edit Collection"
					textAction="Update"
					item={items}
					display={show}
					closeModal={this.closeModal}
					submitCollection={(fields) => this.updateCollection(items, fields)}
				/>
        <div className="top-info">
            <h2>Nasa Collection</h2>
            <div className="add-new-collection">
              <Link to="/addCollection">
                <span className="btn add-item">
                  <Icon classes="add" /> Add New Item
                </span>
              </Link>
            </div>
        </div>
        <div className="main-content">
          <ul className="list-collection-nasa">
            {_.isEmpty(collectionList) && <li className="box-collection"><span>No Collection</span></li>}
						{!_.isEmpty(collectionList) && collectionList.map((item, index) => (
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
                      classes={`icon heart ${this.checkHasFavorite(item) ? 'favorite' : ''}`}
                      onClick={() => this.addFavorite(_.head(item.data))} 
                    />
                    <Button 
                      classes="icon icon del" 
                      onClick={() => this.removeItem(item)} 
                    />
                    <Button 
                      classes="icon icon edit" 
                      onClick={() => this.openModalCollection(item)} 
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

export default Collection;