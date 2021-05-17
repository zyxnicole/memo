
function Detail({detail, onShowDetail}) {

    const hideDetail = function() {
        onShowDetail(false);
    }

    return(
        <div id='detail'>
            <div className='li'>
                <p className='date'>{detail.date}</p>
                <h1 className={detail.type}>{detail.title}</h1>
                <p className='content'>
                {detail.content}
                </p>
                <p className='button'>
                    <input type="button" onClick={hideDetail} value='Back'/>
                </p>
            </div>

        </div>
    )
}

export default Detail;