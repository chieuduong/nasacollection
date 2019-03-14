import React from 'react';
import _ from 'lodash';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

class ModalCollection extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
			titleCollect: '',
			descriptionCollect: '',
			linkImage: '',
    }
	}
	
	componentWillReceiveProps(nextProps) {
		if(!_.isEmpty(nextProps.item)){
			const item = nextProps.item;
			this.setState({
				titleCollect: _.head(item.data).title,
				descriptionCollect: _.head(item.data).description,
				linkImage: _.head(item.links).href,
			})
		}
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	submitCollection = () => {
		const {titleCollect, descriptionCollect, linkImage} = this.state;
		const fields = {
			title: titleCollect,
			description: descriptionCollect,
			link: linkImage,
		}
		this.props.submitCollection(fields);
	}

	render() {
		const {display, closeModal, titleModal, textAction} = this.props;
		const {titleCollect, descriptionCollect, linkImage} = this.state;
		return (
			<div className={`modal ${display ? 'active' : ''}`}>
				<div className="modal-content">
					<span className="icon close close-modal" onClick={closeModal}></span>
						<div className="form-detail-info">
						<div className="title-modal">
							<h3>{titleModal}</h3>
						</div>
						<div className="input-form">
							<label htmlFor="titleCollect">Title</label>
							<input 
								type="text" 
								className="text-box" 
								name="titleCollect" 
								id="titleCollect" 
								placeholder="Title"
								onChange={this.onChange}
								value={titleCollect} 
								/>
						</div>
						<div className="input-form">
							<label htmlFor="descriptionCollect">Description</label>
							<textarea 
								cols="30" 
								rows="3" 
								className="text-box modal-description" 
								name="descriptionCollect" 
								id="descriptionCollect" 
								placeholder="Description"
								onChange={this.onChange}
								value={descriptionCollect}
								></textarea>
						</div>
						<div className="input-form">
							<label htmlFor="linkImage">Link Image</label>
							<input 
								type="text" 
								className="text-box readonly" 
								name="linkImage" 
								id="linkImage" 
								placeholder="Link Image"
								onChange={this.onChange}
								value={linkImage}
								readOnly
							/>
						</div>
						<div className="modal-action">
							<Button 
								classes="add-collection"
								icon={
									<Icon classes="small-icon add" />
								}
								child={textAction}
								onClick={this.submitCollection}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ModalCollection;