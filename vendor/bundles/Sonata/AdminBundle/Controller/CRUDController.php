<?php

/*
 * This file is part of the Sonata package.
 *
 * (c) Thomas Rabaix <thomas.rabaix@sonata-project.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Sonata\AdminBundle\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sonata\AdminBundle\Exception\ModelManagerException;
use Symfony\Component\HttpFoundation\Request;

class CRUDController extends Controller
{
    /**
     * The related Admin class
     *
     * @var \Sonata\AdminBundle\Admin\AdminInterface
     */
    protected $admin;

    /**
     * @param mixed $data
     * @param integer $status
     * @param array $headers
     *
     * @return Response with json encoded data
     */
    public function renderJson($data, $status = 200, $headers = array())
    {
        // fake content-type so browser does not show the download popup when this
        // response is rendered through an iframe (used by the jquery.form.js plugin)
        //  => don't know yet if it is the best solution
        if ($this->get('request')->get('_xml_http_request')
           && strpos($this->get('request')->headers->get('Content-Type'), 'multipart/form-data') === 0) {
            $headers['Content-Type'] = 'text/plain';
        } else {
            $headers['Content-Type'] = 'application/json';
        }

        return new Response(json_encode($data), $status, $headers);
    }

    /**
     *
     * @return boolean true if the request is done by an ajax like query
     */
    public function isXmlHttpRequest()
    {
        return $this->get('request')->isXmlHttpRequest() || $this->get('request')->get('_xml_http_request');
    }

    /**
     * Sets the Container associated with this Controller.
     *
     * @param ContainerInterface $container A ContainerInterface instance
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;

        $this->configure();
    }

    /**
     * Contextualize the admin class depends on the current request
     *
     * @throws \RuntimeException
     * @return void
     */
    public function configure()
    {
        $adminCode = $this->container->get('request')->get('_sonata_admin');
		
        if (!$adminCode) {
            throw new \RuntimeException(sprintf('There is no `_sonata_admin` defined for the controller `%s` and the current route `%s`', get_class($this), $this->container->get('request')->get('_route')));
        }

        $this->admin = $this->container->get('sonata.admin.pool')->getAdminByAdminCode($adminCode);

        if (!$this->admin) {
            throw new \RuntimeException(sprintf('Unable to find the admin class related to the current controller (%s)', get_class($this)));
        }

        $rootAdmin = $this->admin;

        if ($this->admin->isChild()) {
            $this->admin->setCurrentChild(true);
            $rootAdmin = $rootAdmin->getParent();
        }

        $request = $this->container->get('request');

        $rootAdmin->setRequest($request);

        if ($request->get('uniqid')) {
            $this->admin->setUniqid($request->get('uniqid'));
        }
    }

    /**
     * return the base template name
     *
     * @return string the template name
     */
    public function getBaseTemplate()
    {
        if ($this->isXmlHttpRequest()) {
            return $this->admin->getTemplate('ajax');
        }

        return $this->admin->getTemplate('layout');
    }

    /**
     * @param $view
     * @param array $parameters
     * @param null|\Symfony\Component\HttpFoundation\Response $response
     * @return \Symfony\Bundle\FrameworkBundle\Controller\Response
     */
    public function render($view, array $parameters = array(), Response $response = null)
    {
        $parameters['admin']         = isset($parameters['admin']) ? $parameters['admin'] : $this->admin;
        $parameters['base_template'] = isset($parameters['base_template']) ? $parameters['base_template'] : $this->getBaseTemplate();
        $parameters['admin_pool']    = $this->get('sonata.admin.pool');

        return parent::render($view, $parameters);
    }

    /**
     * return the Response object associated to the list action
     *
     * @return Response
     */
    public function listAction()
    {
        if (false === $this->admin->isGranted('LIST')) {
            throw new AccessDeniedException();
        }

        $datagrid = $this->admin->getDatagrid();
        $formView = $datagrid->getForm()->createView();

        // set the theme for the current Admin Form
        $this->get('twig')->getExtension('form')->setTheme($formView, $this->admin->getFilterTheme());

        return $this->render($this->admin->getListTemplate(), array(
            'action'   => 'list',
            'form'     => $formView,
            'datagrid' => $datagrid
        ));
    }

    /**
     * execute a batch delete
     *
     * @throws \Symfony\Component\Security\Core\Exception\AccessDeniedException
     * @param $query
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function batchActionDelete($query)
    {
        if (false === $this->admin->isGranted('DELETE')) {
            throw new AccessDeniedException();
        }

        $modelManager = $this->admin->getModelManager();
        try {
            $modelManager->batchDelete($this->admin->getClass(), $query);
            $this->get('session')->setFlash('sonata_flash_success', 'flash_batch_delete_success');
        } catch ( ModelManagerException $e ) {
            $this->get('session')->setFlash('sonata_flash_error', 'flash_batch_delete_error');
        }

        return new RedirectResponse($this->admin->generateUrl('list', $this->admin->getFilterParameters()));
    }

    /**
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException|\Symfony\Component\Security\Core\Exception\AccessDeniedException
     * @param $id
     * @return \Symfony\Bundle\FrameworkBundle\Controller\Response|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteAction($id)
    {
        $id = $this->get('request')->get($this->admin->getIdParameter());
        $object = $this->admin->getObject($id);

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }

        if (false === $this->admin->isGranted('DELETE', $object)) {
            throw new AccessDeniedException();
        }

        if ($this->getRequest()->getMethod() == 'DELETE') {
            try {
                $this->admin->delete($object);
                $this->get('session')->setFlash('sonata_flash_success', 'flash_delete_success');
            } catch ( ModelManagerException $e ) {
                $this->get('session')->setFlash('sonata_flash_error', 'flash_delete_error');
            }

            return new RedirectResponse($this->admin->generateUrl('list'));
        }

        return $this->render('SonataAdminBundle:CRUD:delete.html.twig', array(
            'object' => $object,
            'action' => 'delete'
        ));
    }

    /**
     * return the Response object associated to the edit action
     *
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     * @param  $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function editAction($id = null)
    {
        $id = $this->get('request')->get($this->admin->getIdParameter());

        $object = $this->admin->getObject($id);

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }

        if (false === $this->admin->isGranted('EDIT', $object)) {
            throw new AccessDeniedException();
        }

        $this->admin->setSubject($object);

        $form = $this->admin->getForm();
        $form->setData($object);

        if ($this->get('request')->getMethod() == 'POST') {
            $form->bindRequest($this->get('request'));

            if ($form->isValid()) {
                $this->admin->update($object);
                $this->get('session')->setFlash('sonata_flash_success', 'flash_edit_success');

                if ($this->isXmlHttpRequest()) {
                    return $this->renderJson(array(
                        'result'    => 'ok',
                        'objectId'  => $this->admin->getNormalizedIdentifier($object)
                    ));
                }

                // redirect to edit mode
                return $this->redirectTo($object);
            }

            $this->get('session')->setFlash('sonata_flash_error', 'flash_edit_error');
        }

        $view = $form->createView();

        // set the theme for the current Admin Form
        $this->get('twig')->getExtension('form')->setTheme($view, $this->admin->getFormTheme());

        return $this->render($this->admin->getEditTemplate(), array(
            'action' => 'edit',
            'form'   => $view,
            'object' => $object,
        ));
    }

    /**
     * redirect the user depend on this choice
     *
     * @param  $object
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function redirectTo($object)
    {
        $url = false;

        if ($this->get('request')->get('btn_update_and_list')) {
            $url = $this->admin->generateUrl('list');
        }

        if ($this->get('request')->get('btn_create_and_create')) {
            $url = $this->admin->generateUrl('create');
        }

        if (!$url) {
            $url = $this->admin->generateObjectUrl('edit', $object);
        }

        return new RedirectResponse($url);
    }

    /**
     * return the Response object associated to the batch action
     *
     * @throws \RuntimeException
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function batchAction()
    {
        if ($this->get('request')->getMethod() != 'POST') {
           throw new \RuntimeException('invalid request type, POST expected');
        }

        if ($data = json_decode($this->get('request')->get('data'), true)) {
            $action = $data['action'];
            $idx    = $data['idx'];
            $all_elements = $data['all_elements'];
        } else {
            $action       = $this->get('request')->get('action');
            $idx          = $this->get('request')->get('idx');
            $all_elements = $this->get('request')->get('all_elements', false);
        }

        $batchActions = $this->admin->getBatchActions();
        if (!array_key_exists($action, $batchActions)) {
            throw new \RuntimeException(sprintf('The `%s` batch action is not defined', $action));
        }

        if (count($idx) == 0 && !$all_elements) { // no item selected
            $this->get('session')->setFlash('sonata_flash_info', 'flash_batch_empty');

            return new RedirectResponse($this->admin->generateUrl('list', $this->admin->getFilterParameters()));
        }

        $askConfirmation = isset($batchActions[$action]['ask_confirmation']) ? $batchActions[$action]['ask_confirmation'] : true;

        if ($askConfirmation && $this->get('request')->get('confirmation') != 'ok') {
            $data = json_encode(array(
                'action' => $action,
                'idx'    => $idx,
                'all_elements' => $all_elements,
            ));

            $datagrid = $this->admin->getDatagrid();
            $formView = $datagrid->getForm()->createView();

            return $this->render('SonataAdminBundle:CRUD:batch_confirmation.html.twig', array(
                'action'   => 'list',
                'datagrid' => $datagrid,
                'form'     => $formView,
                'data'     => $data,
            ));
        }

        // execute the action, batchActionXxxxx
        $action = \Sonata\AdminBundle\Admin\BaseFieldDescription::camelize($action);

        $final_action = sprintf('batchAction%s', ucfirst($action));
        if (!method_exists($this, $final_action)) {
            throw new \RuntimeException(sprintf('A `%s::%s` method must be created', get_class($this), $final_action));
        }

        $datagrid = $this->admin->getDatagrid();
        $datagrid->buildPager();
        $query = $datagrid->getQuery();

        $query->setFirstResult(null);
        $query->setMaxResults(null);

        if (count($idx) > 0) {
            $this->admin->getModelManager()->addIdentifiersToQuery($this->admin->getClass(), $query, $idx);
        }

        return call_user_func(array($this, $final_action), $query);
    }

    /**
     * return the Response object associated to the create action
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createAction()
    {
        if (false === $this->admin->isGranted('CREATE')) {
            throw new AccessDeniedException();
        }

        $object = $this->admin->getNewInstance();

        $this->admin->setSubject($object);

        $form = $this->admin->getForm();
        $form->setData($object);

        if ($this->get('request')->getMethod() == 'POST') {
            $form->bindRequest($this->get('request'));

            if ($form->isValid()) {
                $this->admin->create($object);

                if ($this->isXmlHttpRequest()) {
                    return $this->renderJson(array(
                        'result' => 'ok',
                        'objectId' => $this->admin->getNormalizedIdentifier($object)
                    ));
                }

                $this->get('session')->setFlash('sonata_flash_success','flash_create_success');
                // redirect to edit mode
                return $this->redirectTo($object);
            }
            $this->get('session')->setFlash('sonata_flash_error', 'flash_create_error');
        }

        $view = $form->createView();

        // set the theme for the current Admin Form
        $this->get('twig')->getExtension('form')->setTheme($view, $this->admin->getFormTheme());

        return $this->render($this->admin->getEditTemplate(), array(
            'action' => 'create',
            'form'   => $view,
            'object' => $object,
        ));
    }

    /**
     * return the Response object associated to the view action
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction($id = null)
    {
        $id = $this->get('request')->get($this->admin->getIdParameter());

        $object = $this->admin->getObject($id);

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }

        if (false === $this->admin->isGranted('VIEW', $object)) {
            throw new AccessDeniedException();
        }

        $this->admin->setSubject($object);

        return $this->render($this->admin->getShowTemplate(), array(
            'action'   => 'show',
            'object'   => $object,
            'elements' => $this->admin->getShow(),
        ));
    }

    /**
     * @param null $id
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException|\Symfony\Component\Security\Core\Exception\AccessDeniedException
     */
    public function historyAction($id = null)
    {
        if (false === $this->admin->isGranted('EDIT')) {
            throw new AccessDeniedException();
        }

        $id = $this->get('request')->get($this->admin->getIdParameter());

        $object = $this->admin->getObject($id);

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }

        $manager = $this->get('sonata.admin.audit.manager');

        if (!$manager->hasReader($this->admin->getClass())) {
            throw new NotFoundHttpException(sprintf('unable to find the audit reader for class : %s', $this->admin->getClass()));
        }

        $reader = $manager->getReader($this->admin->getClass());

        $revisions = $reader->findRevisions($this->admin->getClass(), $id);

        return $this->render($this->admin->getTemplate('history'), array(
            'action'   => 'history',
            'object'   => $object,
            'revisions' => $revisions,
        ));
    }

    /**
     * @param null $id
     * @param $revision
     */
    public function historyViewRevisionAction($id = null, $revision = null)
    {
        if (false === $this->admin->isGranted('EDIT')) {
            throw new AccessDeniedException();
        }

        $id = $this->get('request')->get($this->admin->getIdParameter());

        $object = $this->admin->getObject($id);

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }

        $manager = $this->get('sonata.admin.audit.manager');

        if (!$manager->hasReader($this->admin->getClass())) {
            throw new NotFoundHttpException(sprintf('unable to find the audit reader for class : %s', $this->admin->getClass()));
        }

        $reader = $manager->getReader($this->admin->getClass());

        // retrieve the revisioned object
        $object = $reader->find($this->admin->getClass(), $id, $revision);

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the targeted object `%s` from the revision `%s` with classname : `%s`', $id, $revision, $this->admin->getClass()));
        }

        $this->admin->setSubject($object);

        return $this->render($this->admin->getShowTemplate(), array(
            'action'   => 'show',
            'object'   => $object,
            'elements' => $this->admin->getShow(),
        ));
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function exportAction(Request $request)
    {
        $format = $request->get('format');

        $filename = sprintf('export_%s_%s.%s',
            strtolower(substr($this->admin->getClass(), strripos($this->admin->getClass(), '\\') + 1)),
            date('Y_m_d_H_i_s', strtotime('now')),
            $format
        );

        return $this->get('sonata.admin.exporter')->getResponse($format, $filename, $this->admin->getDataSourceIterator());
    }
}