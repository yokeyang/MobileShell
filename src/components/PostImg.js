import React,{Component} from 'react'
import { Upload, Icon, Modal,Col, Row,Button } from 'antd'
import ZmCanvasCrop from './CutImage'
let c
export default class PostImg extends Component {
    constructor(props){
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            cutimgVisible:false,
        }
    }

    handleCancel = () => {
        this.setState({ previewVisible: false })
        this.setState({ cutimgVisible: false })
    }
    saveCallBack = (base64) =>{
        if(typeof(base64) === 'string'){
            let fileList = this.state.fileList
            fileList[0].thumbUrl = base64
            this.setState({fileList})
            this.props.imgUrl(base64)
        }
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    changeAlreadyImg = () =>{
        this.setState({cutimgVisible:true})
    }

    handleChange = ({ file, fileList }) => {
        this.setState({ fileList })
        let status = file.status
        if (status == 'error' || status == 'done'){
            this.setState({cutimgVisible:true})
            c.readFile(fileList[0].originFileObj)
        }
    }

    componentDidMount = () =>{
        c = new ZmCanvasCrop({
            box_width: 200,  //剪裁容器的最大宽度
            box_height: 300, //剪裁容器的最大高度
            min_width: 200,  //要剪裁图片的最小宽度
            min_height: 400  //要剪裁图片的最小高度
        },this.saveCallBack);
    }

    render() {
        const { previewVisible, previewImage, fileList,cutimgVisible } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const changeButton = (
            <div className = "changeButton" onClick = {this.changeAlreadyImg}>
                <span className = "changeButton-content">
                    <div>
                        <Icon type="tool" />
                        <div className = "changeButton-text">修改</div>
                    </div>
                </span>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    action="/image"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    ref = {(input) => {this.ipt = input}}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                {fileList.length >= 1 ? changeButton : null}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <Modal visible={cutimgVisible} footer={null} onCancel={this.handleCancel}>
                    <Row>
                        <Col span = {24}>
                            <div id="canvas-box" ref = {(input) => {this.canvas_box = input}}></div>
                        </Col>
                        <Col span = {24}>
                            <Button type="button" id = "btn" ref = {(input) => {this.save = input}} onClick = {() => {c.save()}}>
                                完成
                            </Button>
                            <div ref = {(input) => {this.base64 = input}}></div>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}
