<?php

namespace Acme\FacturacionBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Acme\FacturacionBundle as FB;
class DefaultController extends Controller
{
    
    public function indexAction()
    {
		//============================================================================
		$xmlstr= file_get_contents('../src/Acme/FacturacionBundle/example.xml') ;		
		$facturaObj = new \SimpleXMLElement($xmlstr);		
		//echo "<pre>";print_r($facturaObj);echo "</pre>";exit;
		//============================================================================
		$pdf = new FB\FacturaPDF('P','mm','letter');
		$pdfName='factura.pdf';				
		$pdf->generarPdf($facturaObj,$pdfName);
		echo '<html><body style="margin: 0; padding: 0;"><object data="'.$pdfName.'" type="application/pdf" width="100%"  height="100%">
			</object></body></html>';
		exit;
        //return $this->render('AcmeFacturacionBundle:Default:index.html.twig', array('name' => $name));
    }
	
	public function templateAction(){
		return $this->render('AcmeFacturacionBundle:templates:template.html.twig');
	}
	public function getTemplatesJsonAction(){
		$arrImages=array(
			array(
				"idTema"=>1,
				"name"=>"zack_dress.jpg",
				"size"=>2645,
				"lastmod"=>1307598194000,
				"url"=>"/bundles/acmefacturacion/templates/images/zack_dress.jpg"
			),
			array(	
				"idTema"=>2,
				"name"=>"zack_dress.jpg",
				"size"=>2645,
				"lastmod"=>1307598194000,
				"url"=>"/bundles/acmefacturacion/templates/images/zack_dress.jpg"
			),
			array(
				"idTema"=>3,
				"name"=>"zack_dress.jpg",
				"size"=>2645,
				"lastmod"=>1307598194000,
				"url"=>"/bundles/acmefacturacion/templates/images/zack_dress.jpg"
			),array(
				"idTema"=>4,
				"name"=>"zack_dress.jpg",
				"size"=>2645,
				"lastmod"=>1307598194000,
				"url"=>"/bundles/acmefacturacion/templates/images/zack_dress.jpg"
			)
			
		);
		echo json_encode(array('images'=>$arrImages));
		//'{"images":[,{"name":"dance_fever.jpg","size":2067,"lastmod":1307598194000,"url":"images\/thumbs\/dance_fever.jpg"},{"name":"zack_hat.jpg","size":2323,"lastmod":1307598194000,"url":"images\/thumbs\/zack_hat.jpg"},{"name":"sara_pink.jpg","size":2154,"lastmod":1307598194000,"url":"images\/thumbs\/sara_pink.jpg"},{"name":"gangster_zack.jpg","size":2115,"lastmod":1307598194000,"url":"images\/thumbs\/gangster_zack.jpg"},{"name":"zacks_grill.jpg","size":2825,"lastmod":1307598194000,"url":"images\/thumbs\/zacks_grill.jpg"},{"name":"kids_hug.jpg","size":2477,"lastmod":1307598194000,"url":"images\/thumbs\/kids_hug.jpg"},{"name":"zack.jpg","size":2901,"lastmod":1307598194000,"url":"images\/thumbs\/zack.jpg"},{"name":"sara_smile.jpg","size":2410,"lastmod":1307598194000,"url":"images\/thumbs\/sara_smile.jpg"},{"name":"up_to_something.jpg","size":2120,"lastmod":1307598194000,"url":"images\/thumbs\/up_to_something.jpg"},{"name":"kids_hug2.jpg","size":2476,"lastmod":1307598194000,"url":"images\/thumbs\/kids_hug2.jpg"},{"name":"zack_sink.jpg","size":2303,"lastmod":1307598194000,"url":"images\/thumbs\/zack_sink.jpg"},{"name":"sara_pumpkin.jpg","size":2588,"lastmod":1307598194000,"url":"images\/thumbs\/sara_pumpkin.jpg"}]}';
		exit;
	}
	
}
