const customHeader = (req, res, next) =>{
    
   try{
        console.log(req.headers);
        const api_key = req.headers.api_key
        if(api_key === 'prueba123'){
            next();
        }
        else{
            res.status(403);
            res.send({error:"API_KEY_INCORRECTA"});
        }
    }
    catch(e){
        res.status(403);
        res.send({error:"OCURRIO_UN_ERROR_EN_EL_HEADER"});

    }
};

module.exports = customHeader;